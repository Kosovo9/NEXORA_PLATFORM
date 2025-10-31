import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

const SECRET = process.env.UPLOAD_HMAC_SECRET;

if (!SECRET) {
  console.warn("UPLOAD_HMAC_SECRET not set - HMAC verification disabled");
}

export interface HMACVerifiedRequest extends NextRequest {
  isHMACVerified?: boolean;
}

/**
 * Middleware para verificar firmas HMAC en uploads y endpoints protegidos
 * Previene scraping y llamadas directas no autorizadas
 */
export function verifyHMAC(req: HMACVerifiedRequest): NextResponse | null {
  if (!SECRET) {
    console.warn("HMAC verification skipped - no secret configured");
    req.isHMACVerified = false;
    return null; // Continue without verification in development
  }

  try {
    const signature = req.headers.get("x-signature") || "";
    const timestamp = req.headers.get("x-timestamp") || "";
    const method = req.method;
    const url = req.url;

    if (!signature || !timestamp) {
      return NextResponse.json(
        { error: "missing_signature_or_timestamp" },
        { status: 401 }
      );
    }

    // Verificar que el timestamp no sea muy antiguo (5 minutos)
    const now = Date.now();
    const requestTime = parseInt(timestamp);
    const maxAge = 5 * 60 * 1000; // 5 minutos

    if (isNaN(requestTime) || now - requestTime > maxAge) {
      return NextResponse.json(
        { error: "expired_timestamp" },
        { status: 401 }
      );
    }

    // Crear el payload para verificar
    const payload = `${method}:${url}:${timestamp}`;
    const expectedSignature = crypto
      .createHmac("sha256", SECRET)
      .update(payload)
      .digest("hex");

    if (!timingSafeEqual(signature, expectedSignature)) {
      return NextResponse.json(
        { error: "invalid_signature" },
        { status: 401 }
      );
    }

    req.isHMACVerified = true;
    return null; // Continue to next middleware/handler
  } catch (error) {
    console.error("HMAC verification error:", error);
    return NextResponse.json(
      { error: "verification_failed" },
      { status: 500 }
    );
  }
}

/**
 * Verificación HMAC para API routes de Next.js
 */
export async function verifyHMACForAPI(
  req: Request,
  body?: string | object
): Promise<{ valid: boolean; error?: string }> {
  if (!SECRET) {
    return { valid: false, error: "no_secret_configured" };
  }

  try {
    const signature = req.headers.get("x-signature") || "";
    const timestamp = req.headers.get("x-timestamp") || "";

    if (!signature || !timestamp) {
      return { valid: false, error: "missing_signature_or_timestamp" };
    }

    // Verificar timestamp
    const now = Date.now();
    const requestTime = parseInt(timestamp);
    const maxAge = 5 * 60 * 1000; // 5 minutos

    if (isNaN(requestTime) || now - requestTime > maxAge) {
      return { valid: false, error: "expired_timestamp" };
    }

    // Preparar payload
    let payload: string;
    if (body) {
      payload = typeof body === "string" ? body : JSON.stringify(body);
    } else {
      payload = `${req.method}:${req.url}:${timestamp}`;
    }

    const expectedSignature = crypto
      .createHmac("sha256", SECRET)
      .update(payload)
      .digest("hex");

    if (!timingSafeEqual(signature, expectedSignature)) {
      return { valid: false, error: "invalid_signature" };
    }

    return { valid: true };
  } catch (error) {
    console.error("HMAC API verification error:", error);
    return { valid: false, error: "verification_failed" };
  }
}

/**
 * Función para generar firmas HMAC (para uso en frontend)
 */
export function generateHMAC(payload: string, secret?: string): string {
  const hmacSecret = secret || SECRET;
  if (!hmacSecret) {
    throw new Error("No HMAC secret available");
  }

  return crypto.createHmac("sha256", hmacSecret).update(payload).digest("hex");
}

/**
 * Comparación segura contra timing attacks
 */
function timingSafeEqual(a: string, b: string): boolean {
  try {
    const bufferA = Buffer.from(a, "hex");
    const bufferB = Buffer.from(b, "hex");

    if (bufferA.length !== bufferB.length) {
      return false;
    }

    return crypto.timingSafeEqual(bufferA, bufferB);
  } catch (error) {
    // Fallback para strings que no son hex
    try {
      const bufferA = Buffer.from(a);
      const bufferB = Buffer.from(b);

      if (bufferA.length !== bufferB.length) {
        return false;
      }

      return crypto.timingSafeEqual(bufferA, bufferB);
    } catch (fallbackError) {
      console.error("Timing safe equal error:", fallbackError);
      return false;
    }
  }
}

/**
 * Wrapper para API routes que requieren verificación HMAC
 */
export function withHMACVerification<T extends any[]>(
  handler: (...args: T) => Promise<Response> | Response
) {
  return async (...args: T): Promise<Response> => {
    const req = args[0] as Request;
    
    const verification = await verifyHMACForAPI(req);
    if (!verification.valid) {
      return new Response(
        JSON.stringify({ error: verification.error }),
        { 
          status: 401,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    return handler(...args);
  };
}
