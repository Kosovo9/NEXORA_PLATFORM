import { getSql } from '@/lib/db';

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'POST,OPTIONS',
  'access-control-allow-headers': 'content-type',
};

export const runtime = 'nodejs';

export async function OPTIONS() {
  return new Response(null, { headers: CORS });
}

export async function POST(req: Request) {
  try {
    const { slug, ref, ua } = await req.json();
    if (!slug) return new Response('slug required', { status: 400, headers: CORS });

    const sql = getSql();
    const link = await sqlSELECT id FROM affiliate_links WHERE slug=;
    if (!link.length) return new Response('link not found', { status: 404, headers: CORS });

    const click = await sql
      INSERT INTO clicks (link_id, referrer, user_agent)
      VALUES (, , )
      RETURNING id
    ;
    return Response.json({ ok: true, click_id: click[0].id }, { headers: CORS });
  } catch (e:any) {
    return new Response('bad request', { status: 400, headers: CORS });
  }
}
