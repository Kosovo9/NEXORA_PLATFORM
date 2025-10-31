import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "unauthorized" },
        { status: 401 }
      );
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "order_id_required" },
        { status: 400 }
      );
    }

    const order = await prisma.order.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "order_not_found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        promptId: order.promptId,
        quantity: order.quantity,
        amount: order.amount,
        currency: order.currency,
        status: order.status,
        paymentMethod: order.paymentMethod,
        paymentIntentId: order.paymentIntentId,
        metadata: order.metadata ? JSON.parse(order.metadata) : {},
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
    });

  } catch (error) {
    console.error("Get order error:", error);
    return NextResponse.json(
      { error: "order_fetch_failed" },
      { status: 500 }
    );
  }
}