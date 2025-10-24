(function(){
  try{
    var s = document.currentScript;
    var slug = (s && s.dataset && s.dataset.slug) || '';
    if(!slug) return;
    var api = new URL(s.src).origin;
    var payload = JSON.stringify({ slug: slug, ref: location.href, ua: navigator.userAgent });
    if (navigator.sendBeacon) {
      navigator.sendBeacon(api + '/api/track', payload);
    } else {
      fetch(api + '/api/track', {
        method: 'POST',
        mode: 'cors',
        headers: { 'content-type': 'application/json' },
        body: payload,
        keepalive: true
      }).catch(function(){});
    }
  }catch(e){}
})();
