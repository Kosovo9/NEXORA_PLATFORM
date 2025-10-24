document.addEventListener("DOMContentLoaded", () => {
  const loading = document.getElementById("loading-screen");
  window.addEventListener("load", () => setTimeout(() => { loading.style.opacity="0"; loading.style.visibility="hidden"; }, 400));

  const mobileBtn = document.querySelector(".mobile-menu");
  const navLinks = document.querySelector(".nav-links");
  mobileBtn?.addEventListener("click", () => {
    const open = navLinks.style.display === "flex";
    navLinks.style.display = open ? "none" : "flex";
    mobileBtn.setAttribute("aria-expanded", (!open).toString());
  });

  async function initClerk(){
    if(!window.CLERK_PUBLISHABLE_KEY){ console.warn("Clerk key missing"); return; }
    await Clerk.load({ publishableKey: window.CLERK_PUBLISHABLE_KEY });
    const authBtn = document.getElementById("clerk-auth");
    const refresh = () => {
      if (Clerk.user) { authBtn.textContent="Mi Cuenta"; authBtn.onclick = () => Clerk.openUserProfile(); }
      else { authBtn.textContent="Acceder"; authBtn.onclick = () => { if (window.CLERK_SIGNIN_URL) location.href = window.CLERK_SIGNIN_URL + "?redirect_url=" + encodeURIComponent(location.href); else Clerk.openSignIn({ redirectUrl: location.href }); }; }
    };
    Clerk.addListener(({ user }) => refresh()); refresh();
  }

  // i18n básico (ES/EN)
  const T = {
    es:{cta:"Obtener Acceso Fundador", s1:"Un Ecosistema, no solo una App", s2:"IA que construye tu plan y ajusta semanalmente.", pricingH:"Planes", pricingS:"Elige tu nivel. Pagos seguros.",
        plans:[{n:"Starter",p:"$499 MXN",per:"Pago único fundador"},{n:"Pro",p:"$1,299 MXN",per:"Mensual"},{n:"Elite",p:"$3,999 MXN",per:"Mensual"}]},
    en:{cta:"Get Founder Access", s1:"An Ecosystem, not just an App", s2:"AI builds your plan and tunes weekly.", pricingH:"Plans", pricingS:"Pick your level. Secure payments.",
        plans:[{n:"Starter",p:"$29 USD",per:"One-time"},{n:"Pro",p:"$79 USD",per:"Monthly"},{n:"Elite",p:"$199 USD",per:"Monthly"}]}
  };
  function setLang(code){ const L=T[code]||T.es; document.getElementById("cta-main-text").textContent=L.cta; document.getElementById("services-title").textContent=L.s1; document.getElementById("services-subtitle").textContent=L.s2; document.getElementById("pricing-title").textContent=L.pricingH; document.getElementById("pricing-subtitle").textContent=L.pricingS; }
  const langSel=document.getElementById("lang-select"); const browser=(navigator.language||"es").slice(0,2); langSel.value=(["es","en"].includes(browser)?browser:"es"); setLang(langSel.value); langSel.addEventListener("change",e=>setLang(e.target.value));

  // Afiliados
  const urlParams = new URLSearchParams(location.search); const aff = urlParams.get("a"); if(aff) document.cookie = `aff_code=${aff}; path=/; max-age=${60*60*24*90}`;

  // Pago + leads
  const planButtons = document.querySelectorAll(".select-plan");
  const modal = document.getElementById("onboarding-modal");
  const closeBtn = document.querySelector(".modal-close-btn");
  const form = document.getElementById("onboarding-form");
  const emailInput = document.getElementById("email-input");
  let chosenPlan=null;

  planButtons.forEach(btn=>btn.addEventListener("click",()=>{ chosenPlan=btn.dataset.plan; modal.style.display="grid"; emailInput.focus(); }));
  closeBtn?.addEventListener("click",()=> modal.style.display="none");

  async function createCheckout(plan, email){
    const r = await fetch("/api/checkout",{ method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ plan, email })});
    const j = await r.json(); if(j.url) location.href=j.url; else alert("Error iniciando pago.");
  }

  form?.addEventListener("submit", async (e)=>{
    e.preventDefault(); const email = (emailInput.value||"").trim(); if(!email || !chosenPlan) return;
    try{
      if(window.SUPABASE_URL && window.SUPABASE_ANON){
        const sb = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON);
        const cookies = Object.fromEntries(document.cookie.split(";").map(c=>c.trim().split("=").map(decodeURIComponent)).filter(a=>a[0]));
        await sb.from("leads").insert({ email, plan: chosenPlan, affiliate_code: cookies["aff_code"] || null, source:"vitae35", created_at: new Date().toISOString() });
      }
    } catch(err){ console.warn("Supabase insert skipped:",err); }
    await createCheckout(chosenPlan, email);
  });

  // Chat IA
  async function ask(prompt){ const r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:[{role:"user",content:prompt}]})}); const j=await r.json(); return j.reply || ""; }
  document.getElementById("ai-assistant-btn")?.addEventListener("click", async ()=>{ const q=prompt("Vitae35 IA : En qué te ayudo hoy?"); if(!q) return; const a=await ask(q); alert(a); });

  initClerk();
});
/* ===== Security Front Additions ===== */
(async function(){
  // Cargar nonce inicial
  let ACCESS_TOKEN = "";
  try {
    const r = await fetch("/api/nonce",{ credentials:"include" });
    const j = await r.json(); ACCESS_TOKEN = j.token || "";
  } catch(e){ console.warn("nonce failed", e); }

  // Bloqueo de dominio (anti-clone)
  try {
    const ALLOWED = (window.ALLOWED_ORIGINS_PUBLIC || ["vitae35.vercel.app"]);
    const h = location.host.toLowerCase();
    const pass = ALLOWED.some(p => {
      const s = p.toLowerCase();
      if (s.startsWith("*.")) return h === s.slice(2) || h.endsWith("."+s.slice(2));
      return h === s;
    });
    if (!pass) {
      const overlay = document.createElement("div");
      overlay.style.cssText = "position:fixed;inset:0;background:#0b1024;color:#fff;display:flex;align-items:center;justify-content:center;z-index:99999;font:600 20px system-ui";
      overlay.textContent = "Access restricted.";
      document.body.appendChild(overlay);
      throw new Error("domain_not_allowed");
    }
  } catch(_) {}

  // Honeypot + time-gate en formularios
  const f = document.getElementById("onboarding-form");
  if (f) {
    const hp = document.createElement("input");
    hp.type="text"; hp.name="website"; hp.id="hp_field"; hp.autocomplete="off"; hp.style.display="none";
    f.appendChild(hp);
    const started = Date.now();
    f.addEventListener("submit", (e)=>{
      const elapsed = Date.now() - started;
      if (hp.value) { e.preventDefault(); alert("Blocked"); return; }       // bot rellena honeypot
      if (elapsed < 2500) { e.preventDefault(); alert("Too fast"); return;} // gate
      // Adjuntar token de acceso a fetch nativo
      const origFetch = window.fetch;
      window.fetch = (input, init={}) => {
        init.headers = Object.assign({}, init.headers, {"X-Access-Token": ACCESS_TOKEN});
        return origFetch(input, init);
      };
    }, { once:true });
  }
})();
