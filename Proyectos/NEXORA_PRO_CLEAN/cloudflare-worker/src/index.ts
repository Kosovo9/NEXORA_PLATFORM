
import jwt from "jsonwebtoken";

export interface Env {
  JWT_SECRET: string;
  ALLOWED_ORIGIN?: string;
  HF_SPACE_BASE: string;
}

function cors(origin?: string) {
  const allow = origin || "*";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Headers": "authorization,content-type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  };
}

function json(data: unknown, status = 200, origin?: string): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json",
      ...cors(origin),
    },
  });
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: cors(env.ALLOWED_ORIGIN) });
    }

    // Basic JWT check (optional for public TTS demo)
    const auth = req.headers.get("authorization") || "";
    if (auth.startsWith("Bearer ")) {
      const token = auth.substring(7);
      try {
        jwt.verify(token, env.JWT_SECRET);
      } catch {
        return json({ error: "Invalid token" }, 401, env.ALLOWED_ORIGIN);
      }
    }

    // Proxy to HF Space
    if (url.pathname === "/llm" || url.pathname === "/tts" || url.pathname === "/health") {
      const target = env.HF_SPACE_BASE + url.pathname;
      const r = await fetch(target, {
        method: req.method,
        headers: { "content-type": req.headers.get("content-type") || "application/json",
                   "authorization": "" },
        body: req.method === "GET" ? null : await req.text(),
      });

      // Streaming SSE passthrough for /llm
      if (url.pathname === "/llm" && r.headers.get("content-type")?.includes("text/event-stream")) {
        return new Response(r.body, {
          status: r.status,
          headers: { "content-type": "text/event-stream", ...cors(env.ALLOWED_ORIGIN) },
        });
      }
      return new Response(r.body, {
        status: r.status,
        headers: { "content-type": r.headers.get("content-type") || "application/json", ...cors(env.ALLOWED_ORIGIN) },
      });
    }

    if (url.pathname === "/") {
      return json({ ok: true, service: "Nexora Avatar Worker" }, 200, env.ALLOWED_ORIGIN);
    }

    return json({ error: "Not found" }, 404, env.ALLOWED_ORIGIN);
  },
} satisfies ExportedHandler<Env>;
