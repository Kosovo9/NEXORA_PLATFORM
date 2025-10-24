// Nexora Tracking Widget
(function(){
  try{
    var s=document.currentScript;
    var api=s&&s.dataset.api?s.dataset.api:(window.NEXORA_API||'');
    var slug=s&&s.dataset.slug?s.dataset.slug:(new URLSearchParams(location.search).get('nexora_slug')||'');
    if(!api||!slug){ console.warn('[nexora] Missing data-api or data-slug'); return; }
    var KEY='nexora_click_'+slug; var now=Date.now(); var last=parseInt(localStorage.getItem(KEY)||'0',10);
    if(now-last<3000) return; localStorage.setItem(KEY,String(now));
    fetch(api.replace(/\/$/, '')+'/api/track/click',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({slug,referrer:document.referrer||null}),keepalive:true})
      .then(r=>r.json()).then(j=>console.debug('[nexora] click ok',j)).catch(e=>console.warn('[nexora]',e));
  }catch(e){ console.warn('[nexora]',e); }
})();
