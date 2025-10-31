import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-signature");

    if (!signature) {
      console.error("Missing x-signature header");
      return NextResponse.json(
        { error: "missing_signature" },
        { status: 400 }
      );
    }

    // Verificar la firma del webhook
    const hmac = crypto.createHmac("sha256", webhookSecret);
    hmac.update(body);
    const digest = hmac.digest("hex");

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))) {
      console.error("Invalid webhook signature");
      return NextResponse.json(
        { error: "invalid_signature" },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);
    const eventType = event.meta?.event_name;

    // Manejar diferentes tipos de eventos
    switch (eventType) {
      case "order_created":
        await handleOrderCreated(event.data);
        break;

      case "order_refunded":
        await handleOrderRefunded(event.data);
        break;

      case "subscription_created":
        await handleSubscriptionCreated(event.data);
        break;

      case "subscription_updated":
        await handleSubscriptionUpdated(event.data);
        break;

      case "subscription_cancelled":
        await handleSubscriptionCancelled(event.data);
        break;

      case "subscription_resumed":
        await handleSubscriptionResumed(event.data);
        break;

      case "subscription_expired":
        await handleSubscriptionExpired(event.data);
        break;

      case "subscription_paused":
        await handleSubscriptionPaused(event.data);
        break;

      case "subscription_unpaused":
        await handleSubscriptionUnpaused(event.data);
        break;

      case "subscription_payment_failed":
        await handleSubscriptionPaymentFailed(event.data);
        break;

      case "subscription_payment_success":
        await handleSubscriptionPaymentSuccess(event.data);
        break;

      default:
        console.log(`Unhandled event type: ${eventType}`);
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

async function handleOrderCreated(orderData: any) {
  try {
    const orderId = orderData.attributes?.custom_data?.orderId;

    if (!orderId) {
      console.error("No orderId in order custom_data");
      return;
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "completed",
        metadata: JSON.stringify({
          lemonSqueezyOrderId: orderData.id,
          lemonSqueezyOrderNumber: orderData.attributes?.order_number,
          amount: orderData.attributes?.total,
          currency: orderData.attributes?.currency,
          customerEmail: orderData.attributes?.user_email,
        }),
      },
    });

    console.log(`Order ${orderId} completed via Lemon Squeezy`);

  } catch (error) {
    console.error("Error handling order created:", error);
  }
}

async function handleOrderRefunded(orderData: any) {
  try {
    const orderId = orderData.attributes?.custom_data?.orderId;

    if (!orderId) {
      console.error("No orderId in order custom_data");
      return;
    }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "refunded",
        metadata: JSON.stringify({
          lemonSqueezyOrderId: orderData.id,
          refundedAt: new Date().toISOString(),
          refundAmount: orderData.attributes?.refunded_amount,
        }),
      },
    });

    console.log(`Order ${orderId} refunded via Lemon Squeezy`);

  } catch (error) {
    console.error("Error handling order refunded:", error);
  }
}

async function handleSubscriptionCreated(subscriptionData: any) {
  try {
    console.log(`Subscription created: ${subscriptionData.id}`);
    
    // Aquí puedes agregar lógica para manejar nuevas suscripciones
    // Por ejemplo, actualizar el estado del usuario, activar permisos, etc.

  } catch (error) {
    console.error("Error handling subscription created:", error);
  }
}

async function handleSubscriptionUpdated(subscriptionData: any) {
  try {
    console.log(`Subscription updated: ${subscriptionData.id}`);
    
    // Manejar actualizaciones de suscripción
    // Por ejemplo, cambios de plan, actualizaciones de billing, etc.

  } catch (error) {
    console.error("Error handling subscription updated:", error);
  }
}

async function handleSubscriptionCancelled(subscriptionData: any) {
  try {
    console.log(`Subscription cancelled: ${subscriptionData.id}`);
    
    // Manejar cancelación de suscripción
    // Por ejemplo, desactivar permisos, enviar emails de confirmación, etc.

  } catch (error) {
    console.error("Error handling subscription cancelled:", error);
  }
}

async function handleSubscriptionResumed(subscriptionData: any) {
  try {
    console.log(`Subscription resumed: ${subscriptionData.id}`);
    
    // Manejar reanudación de suscripción
    // Por ejemplo, reactivar permisos, enviar emails de bienvenida, etc.

  } catch (error) {
    console.error("Error handling subscription resumed:", error);
  }
}

async function handleSubscriptionExpired(subscriptionData: any) {
  try {
    console.log(`Subscription expired: ${subscriptionData.id}`);
    
    // Manejar expiración de suscripción
    // Por ejemplo, desactivar permisos, enviar emails de renovación, etc.

  } catch (error) {
    console.error("Error handling subscription expired:", error);
  }
}

async function handleSubscriptionPaused(subscriptionData: any) {
  try {
    console.log(`Subscription paused: ${subscriptionData.id}`);
    
    // Manejar pausa de suscripción

  } catch (error) {
    console.error("Error handling subscription paused:", error);
  }
}

async function handleSubscriptionUnpaused(subscriptionData: any) {
  try {
    console.log(`Subscription unpaused: ${subscriptionData.id}`);
    
    // Manejar reanudación de suscripción pausada

  } catch (error) {
    console.error("Error handling subscription unpaused:", error);
  }
}

async function handleSubscriptionPaymentFailed(subscriptionData: any) {
  try {
    console.log(`Subscription payment failed: ${subscriptionData.id}`);
    
    // Manejar fallo de pago de suscripción
    // Por ejemplo, enviar emails de notificación, intentar cobro alternativo, etc.

  } catch (error) {
    console.error("Error handling subscription payment failed:", error);
  }
}

async function handleSubscriptionPaymentSuccess(subscriptionData: any) {
  try {
    console.log(`Subscription payment success: ${subscriptionData.id}`);
    
    // Manejar pago exitoso de suscripción
    // Por ejemplo, extender período de suscripción, enviar recibos, etc.

  } catch (error) {
    console.error("Error handling subscription payment success:", error);
  }
}