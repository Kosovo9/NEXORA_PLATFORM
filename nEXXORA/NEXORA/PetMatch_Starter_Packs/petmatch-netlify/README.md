# PetMatch — Netlify Starter
Despliegue rápido con **Netlify Forms + Functions + Edge**.

## Variables de entorno
- `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`
- `SUCCESS_URL`, `CANCEL_URL`
- `HF_API_URL`, `HF_API_KEY` (Hugging Face Inference; opcional)
- `DEEPSEEK_API_KEY`, `QWEN_API_KEY` (opcionales; integra sus endpoints)
- (Opcional) `HYPERSWITCH_PAYMENT_LINK`

## Deploy
```powershell
cd C:\Proyectos\NEXORA_PRO_CLEAN
npm i -g netlify-cli
cd .\petmatch-netlify
npm i
ntl init
ntl deploy --build --prod
```
