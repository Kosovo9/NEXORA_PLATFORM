import { getSql } from '@/lib/db'; export const runtime='nodejs';
export async function POST(req:Request){
  const { slug, referrer } = await req.json(); if(!slug) return new Response('slug required',{status:400});
  const sql=getSql(); const link = await sql`SELECT id FROM affiliate_links WHERE slug=${slug}`; if(link.length===0) return new Response('link not found',{status:404});
  const ip = req.headers.get('x-forwarded-for') || '0.0.0.0'; const ua = req.headers.get('user-agent') || '';
  const row = await sql`INSERT INTO clicks (link_id, ip, user_agent, referrer) VALUES (${link[0].id}, ${ip}, ${ua}, ${referrer||null}) RETURNING id, created_at`;
  return Response.json({ click_id: row[0].id, created_at: row[0].created_at });
}
