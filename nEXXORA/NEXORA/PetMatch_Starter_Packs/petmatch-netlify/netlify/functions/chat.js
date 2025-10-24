
const fetch = require('node-fetch');
exports.handler = async (event) => {
  try {
    const { message, provider='hf' } = JSON.parse(event.body || '{}');
    if(!message) return { statusCode:400, body: JSON.stringify({ error:'No message' }) };
    let reply = "Hola, soy tu asistente.";
    if(provider==='hf' && process.env.HF_API_URL && process.env.HF_API_KEY){
      const r = await fetch(process.env.HF_API_URL, {
        method:'POST',
        headers:{ 'Authorization':`Bearer ${process.env.HF_API_KEY}`, 'Content-Type':'application/json' },
        body: JSON.stringify({ inputs: message })
      });
      const data = await r.json();
      reply = (Array.isArray(data) ? data[0].generated_text : (data.generated_text || JSON.stringify(data))).slice(0,800);
    }
    return { statusCode:200, body: JSON.stringify({ reply }) };
  } catch(e){
    return { statusCode:500, body: JSON.stringify({ error:e.message }) };
  }
};
