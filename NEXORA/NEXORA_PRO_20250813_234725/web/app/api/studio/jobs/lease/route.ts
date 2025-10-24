import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
export const runtime = 'nodejs'
export async function POST(){
  for(let i=0;i<3;i++){
    const job = await prisma.job.findFirst({ where:{ status:'queued' }, orderBy:{ createdAt:'asc' } })
    if(!job) return new NextResponse(null,{ status:204 })
    const updated = await prisma.job.updateMany({ where:{ id: job.id, status:'queued' }, data:{ status:'processing', startedAt: new Date() } })
    if(updated.count===1) return NextResponse.json(job)
  }
  return new NextResponse(null,{ status:204 })
}
