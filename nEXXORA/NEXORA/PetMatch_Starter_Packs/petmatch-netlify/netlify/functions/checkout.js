
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.handler = async () => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      success_url: process.env.SUCCESS_URL || 'https://example.com/success',
      cancel_url: process.env.CANCEL_URL  || 'https://example.com/cancel',
    });
    return { statusCode:200, body: JSON.stringify({ url: session.url }) };
  } catch (e) {
    return { statusCode:500, body: JSON.stringify({ error: e.message }) };
  }
};
