/**
 * _security/guard.js  Fortress middleware para funciones /api/*
 * - Verifica Host/Origin/Referer contra allowlist (con soporte wildcard)
 * - CORS estricto
 * - Rate-limit token bucket por IP+UA
 * - Bloquea user-agents de scraping comunes
 * - Verifica Turnstile (opcional) y token HMAC (nonce) con expiración
 */

import crypto from "crypto";

const sec = {
  allowedOrigins: (process.env.ALLOWED_ORIGINS || "https://vitae35.vercel.app,https://localhost,https://127.0.0.1").split(",").map(s => s.trim()).filter(Boolean),
  hmacSecret: process.env.SECRET_SIGNING || "change-me-" + crypto.randomBytes(16).toString("hex"),
  turnstileSecret: process.env.TURNSTILE_SECRET || "",
  ratePerMin: Number(process.env.RATE_LIMIT_PER_MIN || 60),
  burst: Number(process.env.RATE_LIMIT_BURST || 90),
};

const badUA = [
  "curl","wget","python-requests","httpx","scrapy","aiohttp","libwww-perl",
  "java/","okhttp","Go-http-client","node-fetch","axios","headless"," puppeteer","selenium","phantomjs"
];

/** Wildcard matcher tipo "*.mi-dominio.com" */
function matchOrigin(origin, list) {
  try {
    if (!origin) return false;
    const u = new URL(origin);
    const host = u.host.toLowerCase();
    return list.some(p => {
      const s = p.toLowerCase().replace(/^https?:\/\//,"");
      if (s === host) return true;
      // wildcard al principio
      if (s.startsWith("*.")) {
        const root = s.slice(2);
        return host === root || host.endsWith("." + root);
      }
      return false;
    });
  } catch { return false; }
}

/** Token firmado (HMAC) */
export function signToken(payload, ttlSec = 300) {
  const data = {
    ...payload,
    iat: Math.floor(Date.now()/1000),
    exp: Math.floor(Date.now()/1000) + ttlSec
  };
  const json = JSON.stringify(data);
  const b64 = Buffer.from(json).toString("base64url");
  const sig = crypto.createHmac("sha256", sec.hmacSecret).update(b64).digest("base64url");
  return `${b64}.${sig}`;
}
export function verifyToken(token, extraCheck=()=>true) {
  if (!token || !token.includes(".")) return false;
  const [b64, sig] = token.split(".");
  const expSig = crypto.createHmac("sha256", sec.hmacSecret).update(b64).digest("base64url");
  if (sig !== expSig) return false;
  const data = JSON.parse(Buffer.from(b64,"base64url").toString());
  if (typeof data.exp !== "number" || data.exp < Math.floor(Date.now()/1000)) return false;
  return extraCheck(data);
}

/** Rate-limit simple in-memory (por instancia, suficiente para Vercel baseline) */
const buckets = new Map();
function keyOf(req) {
  const ip = (req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "").toString().split(",")[0].trim();
  const ua = (req.headers["user-agent"] || "").toLowerCase();
  return crypto.createHash("sha1").update(ip+"|"+ua).digest("base64");
}
function canPass(req) {
  const now = Date.now();
  const k = keyOf(req);
  const b = buckets.get(k) || { tokens: sec.burst, ts: now };
  // refill por minuto
  const elapsed = (now - b.ts) / 60000;
  b.tokens = Math.min(sec.burst, b.tokens + elapsed * sec.ratePerMin);
  if (b.tokens < 1) { buckets.set(k, b); return false; }
  b.tokens -= 1; b.ts = now; buckets.set(k, b); return true;
}

/** Turnstile verify (opcional) */
async function verifyTurnstile(token, ip) {
  if (!sec.turnstileSecret) return true;
  try {
    const form = new URLSearchParams();
    form.append("secret", sec.turnstileSecret);
    form.append("response", token || "");
    if (ip) form.append("remoteip", ip);
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method:"POST", body:form
    });
    const j = await r.json();
    return !!j.success;
  } catch { return false; }
}

/** Guard principal */
export async function guard(req, res, opts = {}) {
  const origin = req.headers.origin || "";
  const referer = req.headers.referer || "";
  const host = (req.headers.host || "").toLowerCase();
  const ua = (req.headers["user-agent"] || "").toLowerCase();

  // Block obvious scrapers
  if (badUA.some(s => ua.includes(s))) {
    return res.status(403).json({ error: "blocked_user_agent" });
  }

  // Host/Origin/Referer allowlist (anti-clone)
  const allow = matchOrigin(origin, sec.allowedOrigins) || matchOrigin(referer, sec.allowedOrigins) || sec.allowedOrigins.some(h => {
    const hHost = h.toLowerCase().replace(/^https?:\/\//,"");
    return hHost === host || (hHost.startsWith("*.") && (host === hHost.slice(2) || host.endsWith("."+hHost.slice(2))));
  });
  if (!allow) return res.status(403).json({ error: "origin_not_allowed" });

  // CORS estricto
  res.setHeader("Vary","Origin");
  if (origin && allow) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials","true");
    res.setHeader("Access-Control-Allow-Headers","Content-Type, X-Access-Token, X-Turnstile-Token");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,OPTIONS");
  }
  if (req.method === "OPTIONS") return res.status(204).end();

  // Rate-limit
  if (!canPass(req)) return res.status(429).json({ error: "rate_limited" });

  // Token HMAC (desde /api/nonce)
  if (opts.requireToken !== false) {
    const token = req.headers["x-access-token"];
    const ok = verifyToken(String(token||""), (data) => {
      // binding a hash de UA para elevar costo de bots
      return data.ua === crypto.createHash("sha1").update(ua).digest("hex");
    });
    if (!ok) return res.status(403).json({ error: "bad_token" });
  }

  // Turnstile (si se activó)
  if (opts.requireTurnstile) {
    const turn = req.headers["x-turnstile-token"];
    const ip = (req.headers["x-forwarded-for"] || "").toString().split(",")[0].trim();
    const ok = await verifyTurnstile(String(turn||""), ip);
    if (!ok) return res.status(403).json({ error: "turnstile_failed" });
  }

  // Security cache headers
  res.setHeader("Cache-Control","no-store");
  return null; // pasar
}
