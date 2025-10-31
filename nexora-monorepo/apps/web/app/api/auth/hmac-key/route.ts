import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SECRET = process.env.UPLOAD_HMAC_SECRET;

/**
 * Endpoint para generar claves derivadas HMAC
 * No expone la clave maestra, solo genera claves derivadas temporales
 */
export async function POST(req: NextRequest) {
  if (!SECRET) {
    return NextResponse.json(
      { error: "hmac_secret_not_configured" },
      { status: 500 }
    );
  }

  try {
    const { timestamp } = await req.json();

    if (!timestamp || typeof timestamp !== "number") {
      return NextResponse.json(
        { error: "invalid_timestamp" },
        { status: 400 }
      );
    }

    // Verificar que el timestamp no sea muy antiguo (máximo 5 minutos)
    const now = Date.now();
    const maxAge = 5 * 60 * 1000; // 5 minutos

    if (now - timestamp > maxAge) {
      return NextResponse.json(
        { error: "timestamp_expired" },
        { status: 400 }
      );
    }

    // Generar clave derivada usando el timestamp como salt
    // Esto asegura que cada clave sea única y temporal
    const derivedKey = crypto
      .createHmac("sha256", SECRET)
      .update(`${timestamp}:${req.ip || "unknown"}`)
      .digest("hex");

    // Truncar la clave para mayor seguridad (solo los primeros 32 caracteres)
    const truncatedKey = derivedKey.substring(0, 32);

    return NextResponse.json({
      derivedKey: truncatedKey,
      expiresAt: timestamp + maxAge,
    });
  } catch (error) {
    console.error("HMAC key generation error:", error);
    return NextResponse.json(
      { error: "key_generation_failed" },
      { status: 500 }
    );
  }
}

/**
 * Método GET no permitido para este endpoint
 */
export async function GET() {
  return NextResponse.json(
    { error: "method_not_allowed" },
    { status: 405 }
  );
}
