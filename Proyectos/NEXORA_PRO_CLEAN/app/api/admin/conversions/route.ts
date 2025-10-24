import { getSession } from '@/lib/auth';
import { getSql } from '@/lib/db';
export const runtime='nodejs';
export async function GET(){
  const s = await getSession(); if(!s||s.role!=='admin') return new Response('forbidden',{status:403});
  const sql=getSql();
  const rows = await sql`
    SELECT c.id, c.order_id, c.amount, c.currency, c.status, c.created_at, al.slug, o.title AS offer_title
    FROM conversions c
    LEFT JOIN affiliate_links al ON c.link_id = al.id
    LEFT JOIN offers o ON al.offer_id = o.id
    ORDER BY c.created_at DESC
    LIMIT 200`;
  return Response.json(rows);
}
