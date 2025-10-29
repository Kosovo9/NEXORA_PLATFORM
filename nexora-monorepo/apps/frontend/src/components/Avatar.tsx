
import React, { useEffect, useRef, useState } from 'react'

// Avatar 2D con lipsync básico: abre/cierra boca según amplitud del audio.

export function Avatar({ audioUrl }: { audioUrl: string | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx2d = c.getContext('2d')
    if (!ctx2d) return
    setCtx(ctx2d)
    drawIdle(ctx2d)
  }, [])

  useEffect(() => {
    if (!audioUrl || !ctx) return
    const audio = new Audio(audioUrl)
    const ac = new AudioContext()
    const src = ac.createMediaElementSource(audio)
    const analyser = ac.createAnalyser()
    analyser.fftSize = 1024
    src.connect(analyser)
    analyser.connect(ac.destination)

    let raf = 0
    const data = new Uint8Array(analyser.frequencyBinCount)

    const loop = () => {
      analyser.getByteTimeDomainData(data)
      let sum = 0
      for (let i = 0; i < data.length; i++) {
        const v = (data[i] - 128) / 128
        sum += Math.abs(v)
      }
      const amp = sum / data.length
      drawMouth(ctx!, amp)
      raf = requestAnimationFrame(loop)
    }
    audio.addEventListener('ended', () => {
      cancelAnimationFrame(raf)
      if (ctx) drawIdle(ctx)
    })
    audio.play()
    loop()

    return () => {
      cancelAnimationFrame(raf)
      audio.pause()
      audio.src = ''
      ac.close()
    }
  }, [audioUrl, ctx])

  return (
    <div style={{ width: '100%', background: 'linear-gradient(#111,#222)', borderRadius: 16, padding: 16 }}>
      <canvas ref={canvasRef} width={640} height={360} style={{ width: '100%', borderRadius: 12, background: '#0b1220' }} />
    </div>
  )
}

function drawIdle(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0,0,640,360)
  // cabeza
  ctx.fillStyle = '#0ea5e9'
  ctx.beginPath()
  ctx.arc(320, 180, 120, 0, Math.PI * 2)
  ctx.fill()
  // ojos
  ctx.fillStyle = '#06131f'
  ctx.beginPath(); ctx.arc(280, 150, 12, 0, Math.PI * 2); ctx.fill()
  ctx.beginPath(); ctx.arc(360, 150, 12, 0, Math.PI * 2); ctx.fill()
  // boca cerrada
  ctx.fillStyle = '#06131f'
  ctx.fillRect(285, 220, 70, 8)
}

function drawMouth(ctx: CanvasRenderingContext2D, amp: number) {
  drawIdle(ctx)
  const open = Math.min(50, Math.max(8, amp * 400))
  ctx.fillStyle = '#06131f'
  ctx.fillRect(285, 220 - open/2, 70, open)
}
