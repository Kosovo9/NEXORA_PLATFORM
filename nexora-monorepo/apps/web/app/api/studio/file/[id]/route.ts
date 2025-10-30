import { PrismaClient } from "@prisma/client";

export const runtime = "nodejs";

const prisma = new PrismaClient();

// GET /api/studio/file/[id]
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  // Busca el registro de resultado
  const r = await prisma.jobResult.findUnique({
    where: { id: params.id }
  });

  if (!r) {
    return new Response("not found", { status: 404 });
  }

  // 1) Si tenemos URL pública (CDN / S3 / etc.), streaméala
  if (r.url) {
    try {
      const upstream = await fetch(r.url);
      if (upstream.ok && upstream.body) {
        const headers = new Headers();
        headers.set(
          "content-type",
          upstream.headers.get("content-type") ?? r.contentType ?? "application/octet-stream"
        );
        headers.set(
          "cache-control",
          "public, max-age=31536000, immutable"
        );
        return new Response(upstream.body, { headers });
      }
    } catch {
      // ignore y cae al fallback
    }
  }

  // 2) Fallback legacy: servir el buffer guardado en DB (Bytes)
  if (r.data) {
    const headers = new Headers();
    headers.set(
      "content-type",
      r.contentType ?? "application/octet-stream"
    );
    headers.set(
      "cache-control",
      "public, max-age=31536000, immutable"
    );
    return new Response(r.data, { headers });
  }

  return new Response("no content", { status: 404 });
}