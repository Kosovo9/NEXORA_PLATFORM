'use client';
import { useState } from 'react'; import { useRouter } from 'next/navigation';
export default function SignIn({ params }:{ params:{ locale:string }}){
  const [email,setEmail]=useState('admin@nexora.local'); const [password,setPassword]=useState('Admin123!'); const [err,setErr]=useState(''); const router=useRouter();
  async function submit(e:any){ e.preventDefault(); setErr(''); const r=await fetch('/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})}); if(!r.ok){ setErr(await r.text()); return; } router.push(`/${params.locale}/admin`); }
  return (<div className="max-w-sm mx-auto space-y-4"><h1 className="text-2xl font-bold">Sign in</h1>
    <form onSubmit={submit} className="space-y-3">
      <input className="w-full border rounded px-3 py-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input className="w-full border rounded px-3 py-2" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button className="w-full rounded bg-black text-white py-2">Sign in</button>
    </form>{err && <pre className="text-red-600 whitespace-pre-wrap text-sm">{err}</pre>}</div>);
}
