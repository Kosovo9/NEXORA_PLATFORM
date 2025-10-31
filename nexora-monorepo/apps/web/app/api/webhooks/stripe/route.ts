import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      console.error("Missing stripe-signature header");
      return NextResponse.json(
        { error: "missing_signature" },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        { error: "invalid_signature" },
        { status: 400 }
      );
    }

    // Manejar diferentes tipos de eventos
    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case "payment_intent.payment_failed":
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      case "payment_intent.canceled":
        await handlePaymentCanceled(event.data.object as Stripe.PaymentIntent);
        break;

      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await handleSubscriptionChange(event.data.object as Stripe.Subscription);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "webhook_processing_failed" },
      { status: 500 }
    );
  }
}

async function handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  try {
    const orderId = paymentIntent.metadata?.orderId;

    if (!orderId) {
      console.error("No orderId in payment intent metadata");
      return;
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "completed",
        paymentIntentId: paymentIntent.id,
        metadata: JSON.stringify({
          stripePaymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          paymentMethod: paymentIntent.payment_method,
        }),
      },
    });

    console.log(`Order ${orderId} marked as completed`);

  } catch (error) {
    console.error("Error handling payment succeeded:", error);
  }
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  try {
    const orderId = paymentIntent.metadata?.orderId;

    if (!orderId) {
      console.error("No orderId in payment intent metadata");
      return;
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "failed",
        metadata: JSON.stringify({
          stripePaymentIntentId: paymentIntent.id,
          failureReason: paymentIntent.last_payment_error?.message || "Payment failed",
        }),
      },
    });

    console.log(`Order ${orderId} marked as failed`);

  } catch (error) {
    console.error("Error handling payment failed:", error);
  }
}

async function handlePaymentCanceled(paymentIntent: Stripe.PaymentIntent) {
  try {
    const orderId = paymentIntent.metadata?.orderId;

    if (!orderId) {
      console.error("No orderId in payment intent metadata");
      return;
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "cancelled",
        metadata: JSON.stringify({
          stripePaymentIntentId: paymentIntent.id,
          canceledAt: new Date().toISOString(),
        }),
      },
    });

    console.log(`Order ${orderId} marked as cancelled`);

  } catch (error) {
    console.error("Error handling payment canceled:", error);
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  try {
    // Manejar pagos de suscripciones o facturas
    console.log(`Invoice payment succeeded: ${invoice.id}`);
    
    // Aquí puedes agregar lógica específica para facturas
    // Por ejemplo, activar suscripciones, enviar emails, etc.

  } catch (error) {
    console.error("Error handling invoice payment succeeded:", error);
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  try {
    // Manejar cambios en suscripciones
    console.log(`Subscription ${subscription.status}: ${subscription.id}`);
    
    // Aquí puedes agregar lógica para manejar suscripciones
    // Por ejemplo, actualizar el estado del usuario, permisos, etc.

  } catch (error) {
    console.error("Error handling subscription change:", error);
  }
}