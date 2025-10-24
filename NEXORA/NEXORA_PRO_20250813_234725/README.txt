NEXORA PRO (mínimo funcional)
1) web/.env -> pega tu DATABASE_URL de Neon (sslmode=require) y PUBLIC_BASE_URL=http://localhost:3000
2) En web/: npm install && npx prisma generate && npx prisma migrate dev --name init && npm run dev
3) En otra consola: cd worker_fast && python -m venv .venv && .\.venv\Scripts\activate && pip install -r requirements.txt && set API_BASE=http://localhost:3000 && python worker.py
4) Abre http://localhost:3000/studio y genera un job.
Para Vercel: env DATABASE_URL (pooled) y PUBLIC_BASE_URL=https://TUAPP.vercel.app
