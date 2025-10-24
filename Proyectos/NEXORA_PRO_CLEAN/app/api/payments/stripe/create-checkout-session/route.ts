import Stripe from 'stripe';
export const runtime = 'nodejs';
export async function POST(req: Request){
  const { priceId, success_url, cancel_url, slug } = await req.json();
  if(!priceId) return new Response('priceId required',{status:400});
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' });
  const session = await stripe.checkout.sessions.create({
    mode:'payment',
    line_items:[{price:priceId,quantity:1}],
    success_url: success_url || 'https://example.com/success',
    cancel_url: cancel_url || 'https://example.com/cancel',
    metadata: slug ? { nexora_slug: slug } : undefined,
  });
  return Response.json({ id: session.id, url: session.url });
}
