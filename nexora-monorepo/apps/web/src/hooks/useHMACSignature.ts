import { useCallback } from "react";

/**
 * Hook para generar firmas HMAC en el frontend
 * Utiliza la Web Crypto API para generar firmas seguras
 */
export const useHMACSignature = () => {
  const generateSignature = useCallback(async (
    method: string,
    url: string,
    body?: string | object,
    timestamp?: number
  ): Promise<{ signature: string; timestamp: number }> => {
    const ts = timestamp || Date.now();
    
    let payload: string;
    if (body) {
      payload = typeof body === "string" ? body : JSON.stringify(body);
    } else {
      payload = `${method}:${url}:${ts}`;
    }

    // Obtener la clave HMAC del servidor (endpoint público que no revela la clave)
    const keyResponse = await fetch("/api/auth/hmac-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timestamp: ts })
    });

    if (!keyResponse.ok) {
      throw new Error("Failed to get HMAC key");
    }

    const { derivedKey } = await keyResponse.json();
    
    // Generar firma usando Web Crypto API
    const encoder = new TextEncoder();
    const keyData = encoder.encode(derivedKey);
    const payloadData = encoder.encode(payload);

    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signature = await crypto.subtle.sign("HMAC", cryptoKey, payloadData);
    const signatureHex = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");

    return { signature: signatureHex, timestamp: ts };
  }, []);

  const createSignedRequest = useCallback(async (
    url: string,
    options: RequestInit = {}
  ): Promise<RequestInit> => {
    const method = options.method || "GET";
    const body = options.body;
    
    const { signature, timestamp } = await generateSignature(
      method,
      url,
      typeof body === "string" ? body : undefined
    );

    return {
      ...options,
      headers: {
        ...options.headers,
        "X-Signature": signature,
        "X-Timestamp": timestamp.toString(),
      },
    };
  }, [generateSignature]);

  return {
    generateSignature,
    createSignedRequest,
  };
};

/**
 * Función utilitaria para realizar fetch con firma HMAC
 */
export const fetchWithHMAC = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const method = options.method || "GET";
  const body = options.body;
  
  // Generar timestamp
  const timestamp = Date.now();
  
  let payload: string;
  if (body) {
    payload = typeof body === "string" ? body : JSON.stringify(body);
  } else {
    payload = `${method}:${url}:${timestamp}`;
  }

  // Obtener clave derivada del servidor
  const keyResponse = await fetch("/api/auth/hmac-key", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ timestamp })
  });

  if (!keyResponse.ok) {
    throw new Error("Failed to get HMAC key");
  }

  const { derivedKey } = await keyResponse.json();
  
  // Generar firma
  const encoder = new TextEncoder();
  const keyData = encoder.encode(derivedKey);
  const payloadData = encoder.encode(payload);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", cryptoKey, payloadData);
  const signatureHex = Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");

  // Realizar la petición con firma
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      "X-Signature": signatureHex,
      "X-Timestamp": timestamp.toString(),
    },
  });
};
