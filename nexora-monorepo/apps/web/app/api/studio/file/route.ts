import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Find JobResult by id
    const r = await prisma.jobResult.findUnique({
      where: { id },
    });

    if (!r) {
      return new NextResponse("not found", { status: 404 });
    }

    // If r.url exists, stream from upstream
    if (r.url) {
      try {
        const upstream = await fetch(r.url);
        if (upstream.ok && upstream.body) {
          return new NextResponse(upstream.body, {
            headers: {
              "content-type": upstream.headers.get("content-type") ?? r.contentType ?? "application/octet-stream",
              "cache-control": "public, max-age=31536000, immutable"
            }
          });
        }
      } catch (error) {
        // Fall through to data fallback
      }
    }

    // Else if r.data exists, serve from database
    if (r.data) {
      return new NextResponse(r.data, {
        headers: {
          "content-type": r.contentType ?? "application/octet-stream",
          "cache-control": "public, max-age=31536000, immutable"
        }
      });
    }

    // No content available
    return new NextResponse("no content", { status: 404 });

  } catch (error) {
    console.error("Error serving file:", error);
    return new NextResponse("internal server error", { status: 500 });
  }
}
