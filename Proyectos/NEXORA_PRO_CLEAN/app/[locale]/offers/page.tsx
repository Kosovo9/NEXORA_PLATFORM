import { getSql } from "@/lib/db";
import Link from "next/link";
export const dynamic = "force-dynamic";
export default async function OffersPage({ params }:{ params:{ locale:string }}){
  const sql = getSql(); const offers = await sql`SELECT id,title,description,url,payout_type,payout_value,currency,active,created_at FROM offers WHERE active=true ORDER BY created_at DESC`;
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Offers</h1>
      <div className="grid gap-4">
        {offers.map((o:any)=>(
          <div key={o.id} className="p-4 border rounded-xl">
            <h3 className="font-semibold">{o.title}</h3>
            <p className="text-sm text-slate-600">{o.description}</p>
            <div className="text-xs text-slate-500">{o.payout_type.toUpperCase()} {o.payout_value} {o.currency}</div>
            <div className="mt-2"><Link href={o.url} className="text-blue-600 underline" target="_blank">Visit</Link></div>
          </div>
        ))}
      </div>
    </section>
  );
}
