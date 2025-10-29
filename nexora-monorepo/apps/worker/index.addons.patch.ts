// --- ADD to your cloudflare-worker/src/index.ts ---
if (url.pathname === "/llm" || url.pathname === "/tts" || url.pathname === "/health" || url.pathname === "/webrtc") {
  const target = env.HF_SPACE_BASE + url.pathname;
  const r = await fetch(target, {
    method: req.method,
    headers: { "content-type": req.headers.get("content-type") || "application/json", "authorization": "" },
    body: req.method === "GET" ? null : await req.text(),
  });
  if (url.pathname === "/llm" && r.headers.get("content-type")?.includes("text/event-stream")) {
    return new Response(r.body, { status: r.status, headers: { "content-type": "text/event-stream", ...cors(env.ALLOWED_ORIGIN) } });
  }
  return new Response(r.body, { status: r.status, headers: { "content-type": r.headers.get("content-type") || "application/json", ...cors(env.ALLOWED_ORIGIN) } });
}
