
export default async (request, context) => {
  const res = await context.next();
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy","camera=(), microphone=(), geolocation=()");
  return res;
};
