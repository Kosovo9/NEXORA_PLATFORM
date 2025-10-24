import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.NEON_DATABASE_URL);

async function run(){
  console.log('Seeding Neon...');
  await sql`CREATE EXTENSION IF NOT EXISTS pgcrypto`;
  const email='admin@nexora.local', pass='Admin123!', name='Admin';

  const ex = await sql`SELECT id FROM users WHERE email=${email}`;
  if(ex.length===0){
    const hash = await bcrypt.hash(pass,10);
    await sql`INSERT INTO users (email,password_hash,name,role) VALUES (${email}, ${hash}, ${name}, 'admin')`;
    console.log('Admin creado');
  }else{
    console.log('Admin ya existe');
  }

  const off = await sql`SELECT id FROM offers LIMIT 1`;
  if(off.length===0){
    await sql`INSERT INTO offers (title,description,url,payout_type,payout_value,currency,active)
              VALUES ('Demo Offer','Compra demo','https://example.com','cpa',5,'USD',true)`;
    console.log('Oferta demo creada');
  } else {
    console.log('Oferta demo ya existe');
  }
}
run().then(()=>{ console.log('Seed listo'); }).catch(e=>{ console.error(e); process.exit(1); });
