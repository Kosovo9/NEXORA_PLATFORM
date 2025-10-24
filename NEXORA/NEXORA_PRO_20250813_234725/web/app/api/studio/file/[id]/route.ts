import { prisma } from '@/lib/db'
export const runtime = 'nodejs'
export async function GET(_: Request, { params }: { params: { id: string } }){
  const r = await prisma.jobResult.findUnique({ where:{ id: params.id } })
  if(!r) return new Response('not found',{ status:404 })
  return new Response(r.data, { headers:{ 'content-type': r.contentType, 'cache-control': 'public, max-age=31536000, immutable' } })
}
