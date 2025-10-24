import Stripe from 'stripe'; import { getSql } from '@/lib/db';
export const runtime='nodejs';
export async function POST(req:Request){
  const body = await req.text(); const sig = req.headers.get('stripe-signature') || ''; const secret = process.env.STRIPE_WEBHOOK_SECRET || '';
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' });
  let event; try{ event = stripe.webhooks.constructEvent(body, sig, secret); }catch(e:any){ return new Response(`Webhook Error: ${e.message}`,{status:400}); }
  if(event.type==='checkout.session.completed'){ const s = event.data.object as Stripe.Checkout.Session; const slug = (s.metadata?.nexora_slug as string) || null;
    if(slug){ const sql=getSql(); const link = await sql`SELECT id FROM affiliate_links WHERE slug=${slug}`; if(link.length){ await sql`
      INSERT INTO conversions (link_id, click_id, order_id, amount, currency, status)
      VALUES (${link[0].id}, NULL, ${s.id}, ${s.amount_total? s.amount_total/100:0}, ${s.currency?.toUpperCase()||'USD'}, 'paid')`; } } }
  return new Response('ok',{status:200});
}

