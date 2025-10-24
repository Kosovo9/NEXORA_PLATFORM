
export const onRequestGet: PagesFunction = async (context) => {
  const resp = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${context.env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      mode: "payment",
      "line_items[0][price]": context.env.STRIPE_PRICE_ID,
      "line_items[0][quantity]": "1",
      success_url: context.env.SUCCESS_URL || "https://example.com/success",
      cancel_url:  context.env.CANCEL_URL  || "https://example.com/cancel"
    })
  });
  const data = await resp.json();
  return Response.redirect(data.url, 302);
};
