import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
export const runtime = 'nodejs'
export async function GET(){ const jobs = await prisma.job.findMany({ orderBy:{ createdAt:'desc' }, take: 100 }); return NextResponse.json(jobs) }
export async function POST(req: Request){
  const { type, prompt, negativePrompt, refImage, preset, params, camera, socialTargets, aspect, grade } = await req.json()
  if(!type || !prompt) return new NextResponse('missing',{ status:400 })
  const data:any = { type, prompt, negativePrompt, refImage, preset, camera, socialTargets, aspect, grade }
  if(params){ data.params=params; data.width=params.width; data.height=params.height; data.fps=params.fps; data.frames=params.frames; data.seed=params.seed }
  const job = await prisma.job.create({ data })
  return NextResponse.json({ id: job.id })
}
