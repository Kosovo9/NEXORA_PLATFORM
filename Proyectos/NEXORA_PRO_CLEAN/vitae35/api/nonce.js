import { signToken } from "./_security/guard.js";
import crypto from "crypto";

export default async function handler(req, res){
  if (req.method !== "GET") return res.status(405).end();
  const ua = (req.headers["user-agent"] || "");
  const hashUA = crypto.createHash("sha1").update(ua.toLowerCase()).digest("hex");
  const token = signToken({ ua: hashUA }, 300); // 5 min
  res.setHeader("Cache-Control","no-store");
  res.status(200).json({ token });
}
