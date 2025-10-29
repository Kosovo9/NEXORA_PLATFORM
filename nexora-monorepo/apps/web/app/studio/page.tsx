'use client'
import { useEffect, useState } from 'react'
type Job = { id:string, type:'image'|'video', prompt:string, status:'queued'|'processing'|'done'|'error', resultUrl?:string|null, resultUrls?:string[]|null, error?:string|null, createdAt:string }
export default function Studio(){
  const [type, setType] = useState<'image'|'video'>('image')
  const [prompt, setPrompt] = useState('Escena cinematográfica con luz hermosa')
  const [negative, setNegative] = useState('lowres, blurry, deformed')
  const [width, setWidth] = useState(1024)
  const [height, setHeight] = useState(576)
  const [fps, setFps] = useState(14)
  const [frames, setFrames] = useState(28)
  const [jobs, setJobs] = useState<Job[]>([])
  async function load(){ const r = await fetch('/api/studio/jobs'); setJobs(await r.json()) }
  useEffect(()=>{ load(); const t=setInterval(load,3000); return ()=>clearInterval(t) }, [])
  async function create(){
    const params:any = { width, height, fps, frames }
    await fetch('/api/studio/jobs', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ type, prompt, negativePrompt: negative, params }) })
    await load()
  }
  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-semibold">Studio</h1>
      <div className="card grid md:grid-cols-4 gap-3">
        <div className="md:col-span-3 space-y-2">
          <label className="text-sm opacity-80">Tipo</label>
          <select className="input" value={type} onChange={e=>setType(e.target.value as any)}>
            <option value="image">Imagen</option>
            <option value="video">Video desde foto</option>
          </select>
          <label className="text-sm opacity-80">Prompt</label>
          <input className="input" value={prompt} onChange={e=>setPrompt(e.target.value)} />
          <label className="text-sm opacity-80">Negative prompt</label>
          <input className="input" value={negative} onChange={e=>setNegative(e.target.value)} />
          <div className="grid grid-cols-2 gap-2">
            <div><label className="text-sm opacity-80">Width</label><input className="input" type="number" value={width} onChange={e=>setWidth(parseInt(e.target.value||'0')||0)} /></div>
            <div><label className="text-sm opacity-80">Height</label><input className="input" type="number" value={height} onChange={e=>setHeight(parseInt(e.target.value||'0')||0)} /></div>
            <div><label className="text-sm opacity-80">FPS</label><input className="input" type="number" value={fps} onChange={e=>setFps(parseInt(e.target.value||'0')||0)} /></div>
            <div><label className="text-sm opacity-80">Frames</label><input className="input" type="number" value={frames} onChange={e=>setFrames(parseInt(e.target.value||'0')||0)} /></div>
          </div>
        </div>
        <div className="flex items-end"><button className="btn w-full" onClick={create}>Generar</button></div>
      </div>
      <div className="card overflow-auto">
        <table className="table">
          <thead><tr><th className="p-2 text-left">ID</th><th className="p-2 text-left">Tipo</th><th className="p-2 text-left">Estado</th><th className="p-2 text-left">Resultado</th></tr></thead>
          <tbody>
            {jobs.map(j=>(
              <tr key={j.id} className="border-t border-white/10 align-top">
                <td className="p-2">{j.id.slice(0,8)}…</td>
                <td className="p-2">{j.type}</td>
                <td className="p-2">{j.status}{j.error ? ` / ${j.error}` : ''}</td>
                <td className="p-2">{j.resultUrl ? (j.type==='image' ? <img src={j.resultUrl} className="max-h-32 rounded-lg" /> : <video src={j.resultUrl} controls className="max-h-40 rounded-lg" />) : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
