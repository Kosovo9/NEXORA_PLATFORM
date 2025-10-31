import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import { withHMACVerification } from "../../../middleware/hmacVerify";

const prisma = new PrismaClient();

/**
 * Crear una nueva orden
 */
async function createOrderHandler(req: NextRequest): Promise<Response> {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { 
      promptId, 
      quantity = 1, 
      paymentMethod = "stripe",
      metadata = {} 
    } = body;

    if (!promptId) {
      return NextResponse.json(
        { error: "prompt_id_required" },
        { status: 400 }
      );
    }

    // Validar que el prompt existe (simulado)
    // En un caso real, verificarías en tu base de datos de prompts
    const promptPrice = 9.99; // Precio base por prompt

    const totalAmount = promptPrice * quantity;

    // Crear la orden en la base de datos
    const order = await prisma.order.create({
      data: {
        userId,
        promptId,
        quantity,
        amount: totalAmount,
        currency: "USD",
        status: "pending",
        paymentMethod,
        metadata: JSON.stringify(metadata),
      },
    });

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
        createdAt: order.createdAt,
      },
    });

  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: "order_creation_failed" },
      { status: 500 }
    );
  }
}

/**
 * Listar órdenes del usuario
 */
async function getOrdersHandler(req: NextRequest): Promise<Response> {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");

    const skip = (page - 1) * limit;

    const where: any = { userId };
    if (status) {
      where.status = status;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      orders: orders.map(order => ({
        id: order.id,
        promptId: order.promptId,
        quantity: order.quantity,
        amount: order.amount,
        currency: order.currency,
        status: order.status,
        paymentMethod: order.paymentMethod,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json(
      { error: "orders_fetch_failed" },
      { status: 500 }
    );
  }
}

// Exportar handlers con verificación HMAC
export const POST = withHMACVerification(createOrderHandler);
export const GET = getOrdersHandler; // GET no necesita HMAC para consultas

/**
 * Métodos no permitidos
 */
export async function PUT() {
  return NextResponse.json(
    { error: "method_not_allowed" },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "method_not_allowed" },
    { status: 405 }
  );
}
