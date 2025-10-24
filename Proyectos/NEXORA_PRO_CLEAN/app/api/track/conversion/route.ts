import { getSql } from '@/lib/db'; export const runtime='nodejs';
export async function POST(req:Request){
  const { slug, click_id, order_id, amount, currency='USD' } = await req.json();
  if(!slug||!order_id) return new Response('slug & order_id required',{status:400});
  const sql=getSql(); const link = await sql`SELECT id FROM affiliate_links WHERE slug=${slug}`; if(link.length===0) return new Response('link not found',{status:404});
  const row = await sql`
    INSERT INTO conversions (link_id, click_id, order_id, amount, currency, status)
    VALUES (${link[0].id}, ${click_id||null}, ${order_id}, ${amount||0}, ${currency}, 'pending')
    RETURNING id, created_at`;
  return Response.json({ conversion_id: row[0].id, created_at: row[0].created_at });
}
