import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
export const runtime = 'nodejs'
export async function POST(req: Request){
  const { id, ok, resultUrl, resultUrls, error } = await req.json()
  if(!id) return new NextResponse('missing id',{ status:400 })
  const data:any = { status: ok?'done':'error', resultUrl, error }
  if(Array.isArray(resultUrls)) data.resultUrls = resultUrls
  await prisma.job.update({ where:{ id }, data })
  return NextResponse.json({ ok:true })
}
