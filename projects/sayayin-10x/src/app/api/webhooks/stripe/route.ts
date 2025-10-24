import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const body = await req.text();

  if (!sig || !secret) {
    return new Response('No signature', { status: 400 });
  }

  try {
    const event = JSON.parse(body);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const referralCode = session.metadata?.referral_code;
      const customerId = session.customer;
      const amountTotal = session.amount_total || 0;

      if (referralCode && customerId) {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE!
        );

        await supabase.from('referrals').insert({
          referrer_code: referralCode,
          customer_id: customerId.toString(),
          commission: Math.round(amountTotal * 0.2),
          status: 'pending',
          created_at: new Date().toISOString(),
        });
      }
    }

    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response('Webhook failed', { status: 500 });
  }
}
