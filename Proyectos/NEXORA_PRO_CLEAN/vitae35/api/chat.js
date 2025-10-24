import { guard } from "./_security/guard.js";
export default async function handler(req, res){
  const block = await guard(req,res,{ requireTurnstile: false });
  if (block) return;
  if(req.method!=='POST') return res.status(405).end();
  try{
    const HF_TOKEN = process.env.HF_TOKEN; // secret
    const MODEL = process.env.HF_MODEL || 'meta-llama/Llama-3.1-8B-Instruct';
    const { messages=[] } = req.body || {};
    const prompt = messages.map(m=>`${m.role}: ${m.content}`).join('\n');
    const r = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
      method:'POST',
      headers:{ 'Authorization':`Bearer ${HF_TOKEN}`, 'Content-Type':'application/json' },
      body: JSON.stringify({ inputs: prompt })
    });
    const out = await r.json();
    let text = '';
    if(Array.isArray(out)) text = out[0]?.generated_text || '';
    else text = out?.generated_text || out?.message || JSON.stringify(out);
    res.status(200).json({ reply: text });
  }catch(e){
    res.status(500).json({ error:'chat_failed' });
  }
}
