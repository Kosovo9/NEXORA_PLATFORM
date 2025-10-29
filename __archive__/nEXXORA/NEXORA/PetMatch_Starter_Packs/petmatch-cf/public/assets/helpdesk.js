
// Minimal helpdesk widget (bottom-right). Calls /api/chat-like endpoint per platform.
function openHelpdesk(){ document.getElementById('helpdesk-panel').style.display='flex'; }
function closeHelpdesk(){ document.getElementById('helpdesk-panel').style.display='none'; }
async function sendMsg(){
  const input = document.getElementById('helpdesk-input');
  const text = input.value.trim(); if(!text) return;
  const box = document.getElementById('helpdesk-messages');
  const push = (role, t)=>{ const b=document.createElement('div'); b.className='msg '+role; b.textContent=t; box.appendChild(b); box.scrollTop=box.scrollHeight; }
  push('user', text); input.value='';
  try{
    const r = await fetch(window.HELPDESK_ENDPOINT || '/api/chat', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ message: text, provider: window.HELPDESK_PROVIDER || 'hf' })
    });
    const data = await r.json(); push('ai', data.reply || 'OK');
  } catch(e){ push('ai','(Error de red)'); }
}
