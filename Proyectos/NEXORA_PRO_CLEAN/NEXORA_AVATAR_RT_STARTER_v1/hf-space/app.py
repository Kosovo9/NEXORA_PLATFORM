
import os
import time
import json
import base64
from typing import Optional
from fastapi import FastAPI, Body
from fastapi.responses import StreamingResponse, JSONResponse
import httpx

app = FastAPI(title="Nexora Avatar Space", version="0.1.0")

DEEPSEEK_API_BASE = os.getenv("DEEPSEEK_API_BASE", "https://api.openrouter.ai/v1")
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY", "sk-demo")
DEEPSEEK_MODEL = os.getenv("DEEPSEEK_MODEL", "deepseek-chat")
TTS_ENGINE = os.getenv("TTS_ENGINE", "dummy")  # xtts | openvoice | dummy

async def stream_sse_from_openai_style(payload: dict):
    headers = {
        "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
        "Content-Type": "application/json",
    }
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
async def llm_endpoint(body: dict = Body(...)):
    payload = {
        "model": body.get("model") or DEEPSEEK_MODEL,
        "messages": body.get("messages", []),
        "stream": body.get("stream", True),
        "temperature": body.get("temperature", 0.7)
    }
    return StreamingResponse(stream_sse_from_openai_style(payload), media_type="text/event-stream")

def pcm_sine_wave(duration_s=1.5, rate=24000, freq=440):
    import math, struct
    frames = bytearray()
    total = int(duration_s * rate)
    for i in range(total):
        sample = int(32767.0 * math.sin(2 * math.pi * freq * (i / rate)))
        frames.extend(struct.pack('<h', sample))
    return bytes(frames), rate

@app.post("/tts")
async def tts_endpoint(body: dict = Body(...)):
    text = body.get("text", "Hola desde Nexora Pro")
    lang = body.get("lang", "es")
    engine = (body.get("engine") or TTS_ENGINE).lower()

    if engine == "dummy":
        duration = min(3.0, max(1.0, len(text) / 20.0))
        freq = 440 if str(lang).startswith("es") else 660
        pcm, rate = pcm_sine_wave(duration_s=duration, freq=freq)
        import io, wave
        buf = io.BytesIO()
        with wave.open(buf, "wb") as wf:
            wf.setnchannels(1)
            wf.setsampwidth(2)
            wf.setframerate(rate)
            wf.writeframes(pcm)
        wav_bytes = buf.getvalue()
        b64 = base64.b64encode(wav_bytes).decode("utf-8")
        return JSONResponse({"audio_b64": b64, "rate": rate, "engine": "dummy"})

    return JSONResponse({"error": "TTS engine not implemented (set TTS_ENGINE=dummy or extend with XTTS/OpenVoice)."}, status_code=501)
