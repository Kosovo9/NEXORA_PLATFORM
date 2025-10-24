import { NextResponse } from 'next/server';
import { getSql } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { signSession } from '@/lib/auth';
export const runtime = 'nodejs';
export async function POST(req: Request){
  const { email, password } = await req.json();
  if(!email||!password) return new Response('email & password required',{status:400});
  const sql = getSql(); const rows = await sql`SELECT id,email,password_hash,role,name FROM users WHERE email=${email}`;
  if(rows.length===0) return new Response('invalid credentials',{status:401});
  const u=rows[0]; const ok = await bcrypt.compare(password, u.password_hash); if(!ok) return new Response('invalid credentials',{status:401});
  const token = signSession({ id:u.id, email:u.email, role:u.role, name:u.name });
  const res = NextResponse.json({ ok:true }); res.cookies.set('nexora_token', token,{ httpOnly:true, secure:true, sameSite:'lax', path:'/', maxAge:60*60*24*7 }); return res;
}
