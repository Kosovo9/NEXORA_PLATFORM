import React, { useMemo, useRef, useState } from 'react'
import QRCode from 'qrcode'
import { Avatar } from './components/Avatar'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8787'
const BRAND = import.meta.env.VITE_BRAND_NAME || 'Nexora Pro'
const LANGS = ['es','en','fr','de','it','pt','ar','zh','ja','ko','tr','ru','nl','pl','hi']

export default function App() {
  const [text, setText] = useState('Hola, soy tu avatar de Nexora Pro.')
  const [lang, setLang] = useState(import.meta.env.VITE_DEFAULT_LANG || 'es')
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  const audioRef = useRef<HTMLAudioElement>(null)

  useMemo(() => {
    const url = window.location.href
    QRCode.toDataURL(url, { errorCorrectionLevel: 'H' }).then(setQrDataUrl)
  }, [])

  async function callTTS(t: string, engine = 'dummy') {
    const r = await fetch(API_BASE + '/tts', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ text: t, lang, engine })
    })
    const js = await r.json()
    if (js.audio_b64) {
      const url = 'data:audio/wav;base64,' + js.audio_b64
      setAudioUrl(url)
      setTimeout(() => audioRef.current?.play(), 50)
    } else {
      console.error('TTS error:', js)
    }
  }

  async function streamLLMAndSpeak(prompt: string, engine = 'dummy') {
    const payload = {
      model: 'deepseek-chat',
      stream: true,
      messages: [
        { role: 'system', content: 'You are Nexora Pro multi-lingual assistant.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7
    }

    const r = await fetch(API_BASE + '/llm', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const reader = r.body?.getReader()
    if (!reader) {
      console.error('No stream body from /llm')
      return
    }

    const decoder = new TextDecoder()
    let full = ''
    let done = false
    while (!done) {
      const { value, done: d } = await reader.read()
      done = d
      const chunk = decoder.decode(value || new Uint8Array(), { stream: !done })
      const lines = chunk.split('\n')
      for (const line of lines) {
        if (!line.startsWith('data:')) continue
        const data = line.slice(5).trim()
        if (!data || data === '[DONE]') continue
        try {
          const obj = JSON.parse(data)
          const delta = obj?.choices?.[0]?.delta?.content ?? obj?.choices?.[0]?.message?.content ?? ''
          if (delta) full += delta
        } catch { /* ignora líneas no JSON */ }
      }
    }

    if (!full.trim()) full = 'Hola, soy tu avatar de Nexora Pro.'
    setText(full)
    await callTTS(full, engine)
  }

  async function handleSpeak() {
    await callTTS(text) // engine dummy por defecto
  }

  async function handleLLMThenSpeak() {
    await streamLLMAndSpeak(text) // usa dummy; cambia a 'xtts' cuando actives XTTS
  }

  return (
    <div style={{ fontFamily: 'ui-sans-serif, system-ui', padding: 16, maxWidth: 960, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 0 }}>{BRAND} — Avatar Interactivo</h1>
      <small>Demo MVP (LLM + audio + lipsync en navegador)</small>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16, marginTop: 16 }}>
        <div>
          <Avatar audioUrl={audioUrl} />
          <audio ref={audioRef} src={audioUrl || ''} />
        </div>

        <div>
          <label>Idioma:</label>{' '}
          <select value={lang} onChange={(e) => setLang(e.target.value)}>
            {LANGS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>

          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} style={{ width: '100%', marginTop: 8 }} />

          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleSpeak}>🔊 Hablar (texto actual)</button>
            <button onClick={handleLLMThenSpeak}>🧠 Responder con LLM + TTS</button>
          </div>

          <div style={{ marginTop: 16 }}>
            <div>QR (comparte sesión):</div>
            {qrDataUrl && <img src={qrDataUrl} alt="qr" style={{ width: 128, height: 128, borderRadius: 12 }} />}
          </div>
        </div>
      </div>
    </div>
  )
}

// frontend/src/App.tsx
import { RtcPlayer } from './components/RtcPlayer'

{/* En el panel de la izquierda, debajo del <Avatar/> */}
<RtcPlayer />

