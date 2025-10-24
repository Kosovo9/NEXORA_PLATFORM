// src/app/api/webhooks/lemon-squeezy/route.ts

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('X-Signature') || '';
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || '';

  // Verifica la firma
  const hash = crypto.createHmac('sha256', secret).update(body).digest('hex');
  if (hash !== signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    const event = JSON.parse(body);
    console.log('Webhook recibido:', event.event_name);

    // Aquí puedes manejar eventos como:
    // - order_created
    // - subscription_created
    // - subscription_resumed
    // - etc.

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error procesando webhook:', error);
    return NextResponse.json({ error: 'Failed to parse event' }, { status: 500 });
  }
}