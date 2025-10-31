import { NextRequest, NextResponse } from "next/server";
import { withHMACVerification } from "../../../middleware/hmacVerify";

/**
 * Endpoint de upload protegido con verificación HMAC
 * Solo acepta uploads con firma válida del frontend
 */
async function uploadHandler(req: NextRequest): Promise<Response> {
  try {
    // Verificar que sea un POST
    if (req.method !== "POST") {
      return NextResponse.json(
        { error: "method_not_allowed" },
        { status: 405 }
      );
    }

    // Obtener el archivo del FormData
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "no_file_provided" },
        { status: 400 }
      );
    }

    // Validaciones básicas del archivo
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "file_too_large" },
        { status: 413 }
      );
    }

    // Tipos de archivo permitidos
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "application/pdf",
      "text/plain",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "file_type_not_allowed" },
        { status: 400 }
      );
    }

    // Simular procesamiento del archivo
    // En un caso real, aquí subirías a S3, Cloudflare R2, etc.
    const fileBuffer = await file.arrayBuffer();
    const fileName = `${Date.now()}-${file.name}`;
    
    // Simular guardado exitoso
    const fileUrl = `/uploads/${fileName}`;
    
    console.log(`File uploaded successfully: ${fileName}, size: ${file.size} bytes`);

    return NextResponse.json({
      success: true,
      file: {
        name: fileName,
        originalName: file.name,
        size: file.size,
        type: file.type,
        url: fileUrl,
      },
      uploadedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "upload_failed" },
      { status: 500 }
    );
  }
}

// Exportar el handler protegido con verificación HMAC
export const POST = withHMACVerification(uploadHandler);

/**
 * Método GET no permitido
 */
export async function GET() {
  return NextResponse.json(
    { error: "method_not_allowed" },
    { status: 405 }
  );
}
