
# Nexora Avatar — HF Space

Endpoints:
- GET /health → Ping
- POST /llm → Proxy a modelo DeepSeek (estilo OpenAI SSE)
- POST /tts → TTS (dummy; extiende a XTTS/OpenVoice)

Variables:
- DEEPSEEK_API_BASE, DEEPSEEK_API_KEY, DEEPSEEK_MODEL
- TTS_ENGINE = dummy | xtts | openvoice
