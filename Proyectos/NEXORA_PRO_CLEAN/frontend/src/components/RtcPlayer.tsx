import React, { useRef, useState } from 'react'
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8787'

export function RtcPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [connected, setConnected] = useState(false)

  async function start() {
    const pc = new RTCPeerConnection()
    pc.ontrack = (e) => {
      if (videoRef.current) videoRef.current.srcObject = e.streams[0]
    }
    const offer = await pc.createOffer({ offerToReceiveVideo: true, offerToReceiveAudio: false })
    await pc.setLocalDescription(offer)
    const r = await fetch(API_BASE + '/webrtc', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ sdp: offer.sdp, type: offer.type })
    })
    const ans = await r.json()
    await pc.setRemoteDescription({ sdp: ans.sdp, type: ans.type })
    setConnected(true)
  }

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <video ref={videoRef} autoPlay playsInline style={{ width: '100%', borderRadius: 12, background: '#000' }} />
      <button onClick={start} disabled={connected}>📺 Conectar WebRTC (video)</button>
    </div>
  )
}
