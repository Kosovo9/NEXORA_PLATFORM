import { neon } from '@neondatabase/serverless';
export function getSql(){ const u=process.env.NEON_DATABASE_URL; if(!u) throw new Error('Missing NEON_DATABASE_URL'); return neon(u); }
