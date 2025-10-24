import os, io, base64, asyncio, time
from typing import Optional, Dict, Any
from fastapi import FastAPI, Body
from fastapi.responses import JSONResponse, StreamingResponse
import httpx
import numpy as np
import soundfile as sf

# ========= Config (por variables del Space) =========
DEEPSEEK_API_BASE = os.getenv("DEEPSEEK_API_BASE", "https://api.openrouter.ai/v1")
DEEPSEEK_API_KEY  = os.getenv("DEEPSEEK_API_KEY",  "sk-demo")
DEEPSEEK_MODEL    = os.getenv("DEEPSEEK_MODEL",    "deepseek-chat")
TTS_ENGINE        = os.getenv("TTS_ENGINE",        "xtts")   # xtts | openvoice | dummy
TTS_VOICE_REF     = os.getenv("TTS_VOICE_REF",     None)     # p.ej. ./voices/es_mx_ref.wav

app = FastAPI(title="Nexora Pro Space", version="1.0.0")

# ========= LLM (Proxy SSE) =========
async def stream_sse_from_openai_style(payload: Dict[str, Any]):
    headers = {"Authorization": f"Bearer {DEEPSEEK_API_KEY}", "Content-Type": "application/json"}
    url = f"{DEEPSEEK_API_BASE}/chat/completions"
    async with httpx.AsyncClient(timeout=None) as client:
        async with client.stream("POST", url, headers=headers, json=payload) as r:
            async for line in r.aiter_lines():
                if not line: 
                    continue
                if line.startswith("data:"):
                    yield (line + "\n").encode("utf-8")

@app.get("/health")
def health():
    return {"ok": True, "ts": time.time()}

@app.post("/llm")
async def llm_endpoint(body: Dict[str, Any] = Body(...)):
    payload = {
        "model": body.get("model") or DEEPSEEK_MODEL,
        "messages": body.get("messages", []),
        "stream": body.get("stream", True),
        "temperature": body.get("temperature", 0.7)
    }
    return StreamingResponse(stream_sse_from_openai_style(payload), media_type="text/event-stream")

# ========= TTS (XTTS por defecto) =========
_xtts = None
_xtts_rate = 24000

def _load_xtts():
    global _xtts, _xtts_rate
    if _xtts is None:
        from TTS.api import TTS
        import torch
        device = "cuda" if torch.cuda.is_available() else "cpu"
        _xtts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)
        try:
            _xtts_rate = int(getattr(_xtts, "synthesizer").output_sample_rate)
        except Exception:
            _xtts_rate = 24000
    return _xtts

def _tts_xtts(text: str, lang: str, speaker_wav: Optional[str] = None) -> bytes:
    tts = _load_xtts()
    wav = tts.tts(text=text, speaker_wav=speaker_wav, language=lang)
    buf = io.BytesIO()
    sf.write(buf, np.array(wav), samplerate=_xtts_rate, format="WAV")
    return buf.getvalue()

def _tts_dummy(text: str, lang: str) -> bytes:
    import math, struct, wave
    rate=24000
    duration = min(3.0, max(1.0, len(text)/20.0))
    freq = 440 if str(lang).startswith("es") else 660
    frames = bytearray()
    for i in range(int(duration*rate)):
        sample = int(32767.0 * math.sin(2*math.pi*freq*(i/rate)))
        frames.extend(struct.pack("<h", sample))
    buf = io.BytesIO()
    with wave.open(buf, "wb") as wf:
        wf.setnchannels(1); wf.setsampwidth(2); wf.setframerate(rate); wf.writeframes(bytes(frames))
    return buf.getvalue()

@app.post("/tts")
async def tts_endpoint(body: Dict[str, Any] = Body(...)):
    text   = body.get("text", "Hola desde Nexora Pro")
    lang   = body.get("lang", "es")
    engine = (body.get("engine") or TTS_ENGINE).lower()
    ref    = body.get("speaker_wav") or TTS_VOICE_REF

    if engine == "xtts":
        wav = _tts_xtts(text, lang, ref)
        b64 = base64.b64encode(wav).decode("utf-8")
        return JSONResponse({"audio_b64": b64, "rate": _xtts_rate, "engine": "xtts"})

    if engine == "openvoice":
        # Preparado: cuando tengas los pesos, pones aquí tu pipeline real.
        return JSONResponse({"error": "OpenVoice no implementado aún en este Space. Usa engine=xtts."}, status_code=501)

    wav = _tts_dummy(text, lang)
    b64 = base64.b64encode(wav).decode("utf-8")
    return JSONResponse({"audio_b64": b64, "rate": 24000, "engine": "dummy"})

# ========= WebRTC mínimo (video sintético) =========
from aiortc import RTCPeerConnection, RTCSessionDescription
from aiortc.mediastreams import MediaStreamTrack
from av import VideoFrame
import cv2
from fractions import Fraction

class SyntheticAvatarTrack(MediaStreamTrack):
    kind = "video"
    def __init__(self):
        super().__init__()
        self._fps = 15
        self._w, self._h = 640, 360
        self._t = 0

    async def recv(self):
        await asyncio.sleep(1 / self._fps)
        import numpy as np
        img = np.zeros((self._h, self._w, 3), dtype=np.uint8)
        img[:] = (16, 12, 8)
        now = time.strftime("%H:%M:%S")
        cv2.putText(img, "NEXORA AVATAR", (140, 160), cv2.FONT_HERSHEY_SIMPLEX, 1.0, (255, 180, 40), 2, cv2.LINE_AA)
        cv2.putText(img, now, (250, 200), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (200, 200, 255), 2, cv2.LINE_AA)
        vf = VideoFrame.from_ndarray(img, format="bgr24")
        self._t += 1
        vf.pts = self._t
        vf.time_base = Fraction(1, self._fps)
        return vf

@app.post("/webrtc")
async def webrtc_endpoint(body: Dict[str, Any] = Body(...)):
    offer = RTCSessionDescription(sdp=body["sdp"], type=body["type"])
    pc = RTCPeerConnection()
    pc.addTrack(SyntheticAvatarTrack())

    @pc.on("connectionstatechange")
    async def on_state_change():
        if pc.connectionState in ("failed", "closed", "disconnected"):
            try:
                await pc.close()
            except:
                pass

    await pc.setRemoteDescription(offer)
    answer = await pc.createAnswer()
    await pc.setLocalDescription(answer)
    return JSONResponse({"sdp": pc.localDescription.sdp, "type": pc.localDescription.type})
