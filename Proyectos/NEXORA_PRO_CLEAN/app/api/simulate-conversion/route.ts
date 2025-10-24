import { getSql } from '@/lib/db';

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'POST,OPTIONS',
  'access-control-allow-headers': 'content-type',
};

export const runtime = 'nodejs';

export async function OPTIONS(){ return new Response(null,{ headers:CORS }); }

export async function POST(req: Request){
  const { slug, click_id, amount } = await req.json().catch(()=>({}));
  const sql = getSql();

  let linkId: number|null = null;
  let clickId: number|null = click_id ?? null;

  if (slug) {
    const link = await sqlSELECT id FROM affiliate_links WHERE slug=;
    if (!link.length) return new Response('link not found', { status:404, headers:CORS });
    linkId = link[0].id;
  } else if (clickId) {
    const row = await sqlSELECT link_id FROM clicks WHERE id=;
    if (!row.length) return new Response('click not found', { status:404, headers:CORS });
    linkId = row[0].link_id;
  } else {
    return new Response('slug or click_id required', { status:400, headers:CORS });
  }

  const amt = Number(amount ?? 10);
  await sql
    INSERT INTO conversions (link_id, click_id, amount, currency)
    VALUES (, , , 'USD')
  ;

  return Response.json({ ok:true }, { headers:CORS });
}
