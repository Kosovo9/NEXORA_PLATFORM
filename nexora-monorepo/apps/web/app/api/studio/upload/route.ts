import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
export const runtime = 'nodejs'
export async function POST(req: Request){
  const form = await req.formData()
  const file = form.get('file') as File | null
  const jobId = (form.get('jobId') as string) || ''
  if(!file || !jobId) return new NextResponse('missing',{ status:400 })
  const buf = Buffer.from(await file.arrayBuffer())
  const rec = await prisma.jobResult.create({ data:{ jobId, contentType: file.type || 'application/octet-stream', data: buf } })
  const publicBase = process.env.PUBLIC_BASE_URL || ''
  return NextResponse.json({ url: `${publicBase}/api/studio/file/${rec.id}` })
}
