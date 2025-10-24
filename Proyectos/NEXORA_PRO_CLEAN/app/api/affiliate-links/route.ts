import { getSession } from '@/lib/auth'; import { getSql } from '@/lib/db';
function slug(n=8){ const c='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; return Array.from({length:n},()=>c[Math.floor(Math.random()*c.length)]).join(''); }
export const runtime='nodejs';
export async function POST(req:Request){
  const s=await getSession(); if(!s) return new Response('unauthorized',{status:401});
  const { offer_id, slug:custom } = await req.json(); if(!offer_id) return new Response('offer_id required',{status:400});
  const sql=getSql(); let use=custom||slug(); for(let i=0;i<5;i++){ const ex=await sql`SELECT 1 FROM affiliate_links WHERE slug=${use}`; if(ex.length===0) break; use=slug(); }
  const row = await sql`INSERT INTO affiliate_links (user_id,offer_id,slug) VALUES (${s.id}, ${offer_id}, ${use}) RETURNING *`;
  return Response.json(row[0],{status:201});
}
