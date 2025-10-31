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
    
    const result = await prisma.jobResult.findUnique({
      where: { id }
    });

    if (!result) {
      return new NextResponse("Not found", { status: 404 });
    }

    // If URL exists, fetch from upstream
    if (result.url) {
      try {
        const upstream = await fetch(result.url);
        if (upstream.ok && upstream.body) {
          return new NextResponse(upstream.body, {
            headers: {
              "content-type": upstream.headers.get("content-type") ?? result.contentType ?? "application/octet-stream",
              "cache-control": "public, max-age=31536000, immutable"
            }
          });
        }
      } catch (error) {
        console.error("Failed to fetch from upstream URL:", error);
      }
    }

    // Fallback to data field
    if (result.data) {
      return new NextResponse(result.data, {
        headers: {
          "content-type": result.contentType ?? "application/octet-stream",
          "cache-control": "public, max-age=31536000, immutable"
        }
      });
    }

    return new NextResponse("No content", { status: 404 });
  } catch (error) {
    console.error("API route error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
