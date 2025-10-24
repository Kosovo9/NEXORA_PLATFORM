import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
const SECRET = process.env.JWT_SECRET || 'dev-secret';
export type Session = { id: string; email: string; role: 'user'|'admin'; name?: string|null };
export function signSession(s: Session){ return jwt.sign(s, SECRET, { expiresIn:'7d' }); }
export function verifySession(t: string): Session | null { try { return jwt.verify(t, SECRET) as Session; } catch { return null; } }
export async function getSession(): Promise<Session|null> { const c=await cookies(); const t=c.get('nexora_token')?.value; return t?verifySession(t):null; }
