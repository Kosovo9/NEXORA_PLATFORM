
export const onRequestPost: PagesFunction = async ({ request, env }) => {
  try{
    const { message, provider='hf' } = await request.json();
    let reply = "Hola, soy tu asistente.";
    if(provider==='hf' && env.HF_API_URL && env.HF_API_KEY){
      const r = await fetch(env.HF_API_URL, {
        method:'POST', headers:{ 'Authorization':`Bearer ${env.HF_API_KEY}`, 'Content-Type':'application/json' },
        body: JSON.stringify({ inputs: message })
      });
      const data = await r.json();
      reply = (Array.isArray(data) ? data[0].generated_text : (data.generated_text || JSON.stringify(data))).slice(0,800);
    }
    return new Response(JSON.stringify({ reply }), { headers:{'Content-Type':'application/json'} });
  }catch(e){
    return new Response(JSON.stringify({ error: String(e) }), { status:500 });
  }
};
