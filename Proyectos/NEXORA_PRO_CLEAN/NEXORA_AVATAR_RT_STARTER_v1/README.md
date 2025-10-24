
# Nexora Pro — Interactive Avatar Streaming (Starter Kit)

**Stack (MVP 10x funcional):**
- **Hugging Face Space (Python/FastAPI)**: orquestador + endpoints `/llm`, `/tts`, `/health`.
- **Cloudflare Worker**: gateway seguro (JWT HMAC, CORS) y canal de señalización (stub) para WebRTC.
- **Frontend (Vite + React)**: avatar 2D con lipsync en el navegador + audio TTS (stream pseudo-chunk). QR único y selector de 15 idiomas.

> Este kit está listo para correr **sin dependencias NVIDIA**. El video facial en servidor (SadTalker/LivePortrait) puede añadirse después; aquí resolvemos un flujo en producción con **audio + lipsync en el navegador** (latencia baja, costo mínimo).

---

## 1) Variables de entorno

### 1.1 Cloudflare Worker (`cloudflare-worker/.dev.vars` o en Dashboard)
```
JWT_SECRET=supersecreto_cambia_esto
ALLOWED_ORIGIN=https://tu-frontend.pages.dev
HF_SPACE_BASE=https://<tu-space>.hf.space
```

### 1.2 Hugging Face Space (`hf-space/.env`)
```
DEEPSEEK_API_BASE=https://api.openrouter.ai/v1  # o tu endpoint DeepSeek
DEEPSEEK_API_KEY=sk-xxxxx
DEEPSEEK_MODEL=deepseek-chat  # ajusta el ID real (ej.: deepseek/deepseek-chat, deepseek-v3, etc.)
TTS_ENGINE=xtts                      # xtts | openvoice | dummy
TTS_VOICE_REF=./voices/es_mx_ref.wav # 3–10s de referencia opcional para clonación en XTTS/OpenVoice
PORT=7860
```

### 1.3 Frontend (`frontend/.env`)
```
VITE_API_BASE=https://tu-worker-xyz.workers.dev
VITE_BRAND_NAME=Nexora Pro
VITE_PRIMARY_COLOR=#0ea5e9
VITE_QR_BRAND=1
VITE_DEFAULT_LANG=es
```

---

## 2) Despliegue rápido (Windows, estilo Neil)

### 2.1 Cloudflare Worker
```powershell
cd C:\Proyectos\NEXORA_PRO_CLEAN
npm create cloudflare@latest nexora-avatar-worker -- --type=typescript
# Sustituye src/index.ts y wrangler.toml por los de /cloudflare-worker de este zip
cd nexora-avatar-worker
npm i jsonwebtoken
npx wrangler login
npx wrangler dev --local
# Luego: npx wrangler deploy
```

### 2.2 Hugging Face Space (GPU opcional)
- Crea un **Space** tipo **Gradio / Static** → selecciona **Python (FastAPI)**.  
- Sube el folder `hf-space/` completo.  
- En **Settings → Variables** pega el contenido de `.env`.  
- **Opcional**: si usarás TTS **XTTS/OpenVoice**, añade GPU (T4/L4). Para pruebas, usa `TTS_ENGINE=dummy` y tendrás audio sintético.

### 2.3 Frontend (Vite + React en Cloudflare Pages o Vercel)
```powershell
cd C:\Proyectos\NEXORA_PRO_CLEAN
npm create vite@latest nexora-avatar-frontend -- --template react-ts
# Sustituye src/*, index.html y package.json con los de /frontend de este zip
cd nexora-avatar-frontend
npm i
npm run dev
# Producción: npm run build y sube /dist a Cloudflare Pages
```

---

## 3) Cómo funciona (MVP)
1. El navegador (frontend) llama al Worker (gateway).
2. El Worker valida JWT/HMAC y proxyea hacia el Space.
3. El Space:
   - `/llm` → reenvía al endpoint DeepSeek (stream SSE con fallback).
   - `/tts` → genera audio (XTTS/OpenVoice o **dummy** si no hay GPU).
4. El frontend reproduce audio y **anima un avatar 2D** por **lipsync analizando amplitud** (funciona en cualquier GPU).  
   - Incluye QR con branding Nexora Pro para compartir sesiones rápidas.

> Para **fase 2** puedes activar WebRTC (servidor) y reemplazar el avatar 2D por **SadTalker** o **LivePortrait** desde el Space.

---

## 4) Seguridad y roles
- El Worker aplica **CORS** + **JWT HMAC** (claim `role`: `master_admin` o `project_admin`).  
- Limita endpoints por rol y activa rate-limit por IP o token (añadir KV si lo deseas).

---

## 5) 15 idiomas (selector)
ES, EN, FR, DE, IT, PT, AR, ZH, JA, KO, TR, RU, NL, PL, HI.  
El TTS usa `lang` y el LLM recibe `system_prompt` localizado.

---

## 6) Monetización
- Cobro por **minutos de audio** generados (estimación por bytes/segundos).
- Planes con límite de sesiones simultáneas y voces premium.
- Logging mínimo incluido (duración TTS, tokens LLM aprox).

---

## 7) Próximos upgrades
- WebRTC servidor con `aiortc` + lipsync server-side (SadTalker/LivePortrait).
- Visemes/phonemas de TTS para labios perfectos.
- Admin UI avanzada (bans, kill-session, facturación Stripe).

---

**Soporte express:** Si al subirlo te atoras en “Build failed” del Space, revisa `requirements.txt` y selecciona “Hardware: CPU / GPU T4/L4” según tu `TTS_ENGINE`.
