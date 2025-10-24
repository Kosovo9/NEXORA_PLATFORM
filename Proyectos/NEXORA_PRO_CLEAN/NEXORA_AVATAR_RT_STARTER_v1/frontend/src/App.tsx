
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

  async function callTTS(t: string) {
    const r = await fetch(API_BASE + '/tts', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ text: t, lang, engine: 'dummy' })
    })
    const js = await r.json()
    if (js.audio_b64) {
      const url = 'data:audio/wav;base64,' + js.audio_b64
      setAudioUrl(url)
      setTimeout(() => audioRef.current?.play(), 50)
    }
  }

  async function handleSpeak() {
    await callTTS(text)
  }

  return (
    <div style={{ fontFamily: 'ui-sans-serif, system-ui', padding: 16, maxWidth: 960, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 0 }}>{BRAND} — Avatar Interactivo</h1>
      <small>Demo MVP (audio + lipsync en navegador)</small>

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
            <button onClick={handleSpeak}>🔊 Hablar</button>
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
