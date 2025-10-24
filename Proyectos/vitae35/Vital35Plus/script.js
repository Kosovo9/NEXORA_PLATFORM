// AEGIS v1.1 — front only (no secrets).
// Replace PAYMENT Links (not secret) in the mapping below.
// Supabase uses ANON KEY only on client. Service role must NEVER be exposed.

document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');
  window.addEventListener('load', () => setTimeout(() => {
    loadingScreen.style.opacity = '0';
    loadingScreen.style.visibility = 'hidden';
  }, 500));

  // Mobile menu toggle (placeholder if later used)
  const mobileBtn = document.querySelector('.mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      const open = navLinks.style.display === 'flex';
      navLinks.style.display = open ? 'none' : 'flex';
      mobileBtn.setAttribute('aria-expanded', (!open).toString());
    });
  }

  // i18n
  const translations = {
    es: {
      'meta-title':'Vital35+ | Transformación Premium 35+',
      'meta-description':'IA + ciencia para transformar cuerpo y salud después de los 35.',
      'nav-home':'Inicio','nav-services':'Servicios','nav-pricing':'Planes','nav-login':'Acceder',
      'hero-badge':'✨ Oferta Fundador Exclusiva ✨',
      'hero-title':'El Fin de los Planes Genéricos. <span class="highlight">Tu Transformación Comienza Hoy.</span>',
      'hero-subtitle':'Acceso de por vida a la plataforma de IA #1 para mayores de 35. Un pago y listo: nutrición + entrenamiento 100% personalizado.',
      'cta-main-text':'Obtener Acceso Fundador','stat-label-1':'Primer cliente','stat-label-2':'Cupos fundador','stat-label-3':'Garantía',
      'services-title':'Un Ecosistema, no solo una App','services-subtitle':'IA que construye tu plan a partir de tus datos y ajusta semanalmente.',
      'service-1-title':'Nutrición Metabólica','service-1-desc':'Menús personalizados por metabolismo, horarios, gustos y objetivos.',
      'service-2-title':'Entrenamiento Inteligente','service-2-desc':'Rutinas de fuerza/HIIT con énfasis anti‑lesión y recuperación.',
      'service-3-title':'Progreso & Ajustes','service-3-desc':'Dashboard con métricas clave, seguimiento 24/7 y ajustes automáticos.',
      'pricing-title':'Planes','pricing-subtitle':'Elige tu nivel. Todo con pagos seguros.',
      'plan-1-name':'Starter','plan-1-price':'$499 MXN','plan-1-period':'Pago único fundador',
      'plan-1-f1':'Plan de nutrición básico por IA','plan-1-f2':'Rutina mensual autogestionada','plan-1-f3':'App y recetas esenciales','plan-1-cta':'Elegir Starter',
      'plan-2-name':'Pro','plan-2-price':'$1,299 MXN','plan-2-period':'Mensual',
      'plan-2-f1':'Todo Starter + ajustes semanales','plan-2-f2':'Soporte por chat 24/7','plan-2-f3':'Programas en casa y gimnasio','plan-2-cta':'Elegir Pro',
      'plan-3-name':'Elite','plan-3-price':'$3,999 MXN','plan-3-period':'Mensual',
      'plan-3-f1':'Coach dedicado y videollamadas','plan-3-f2':'Ajustes diarios si aplica','plan-3-f3':'Suplementación personalizada','plan-3-cta':'Elegir Elite',
      'modal-title':'Tu acceso','modal-subtitle':'Deja tu email y te llevamos al pago seguro.','modal-submit-btn':'Continuar','modal-note':'Usamos Stripe. No guardamos tarjetas.',
      'footer-rights':'Todos los derechos reservados.','footer-disclaimer':'Consulta a tu médico antes de iniciar cualquier programa. Resultados varían.'
    },
    en: {
      'meta-title':'Vital35+ | Premium Transformation 35+',
      'meta-description':'AI + science to transform body and health after 35.',
      'nav-home':'Home','nav-services':'Services','nav-pricing':'Pricing','nav-login':'Sign in',
      'hero-badge':'✨ Founder Exclusive Offer ✨',
      'hero-title':'The End of Generic Plans. <span class="highlight">Your Transformation Starts Now.</span>',
      'hero-subtitle':'Lifetime access to the #1 AI platform for 35+. One payment: 100% personalized nutrition + training.',
      'cta-main-text':'Get Founder Access','stat-label-1':'First customer','stat-label-2':'Founder spots','stat-label-3':'Guarantee',
      'services-title':'An Ecosystem, not just an App','services-subtitle':'AI builds your plan from your data and adjusts weekly.',
      'service-1-title':'Metabolic Nutrition','service-1-desc':'Personalized menus by metabolism, schedule and goals.',
      'service-2-title':'Smart Training','service-2-desc':'Strength/HIIT with anti‑injury focus and recovery.',
      'service-3-title':'Progress & Adjustments','service-3-desc':'Dashboard with metrics, 24/7 tracking and auto‑tuning.',
      'pricing-title':'Plans','pricing-subtitle':'Pick your level. Secure payments.',
      'plan-1-name':'Starter','plan-1-price':'$29 USD','plan-1-period':'One‑time founder',
      'plan-1-f1':'Basic AI nutrition plan','plan-1-f2':'Monthly self‑guided routine','plan-1-f3':'App + essential recipes','plan-1-cta':'Choose Starter',
      'plan-2-name':'Pro','plan-2-price':'$79 USD','plan-2-period':'Monthly',
      'plan-2-f1':'Starter + weekly adjustments','plan-2-f2':'24/7 chat support','plan-2-f3':'Home & gym programs','plan-2-cta':'Choose Pro',
      'plan-3-name':'Elite','plan-3-price':'$199 USD','plan-3-period':'Monthly',
      'plan-3-f1':'Dedicated coach & calls','plan-3-f2':'Daily tweaks if needed','plan-3-f3':'Personalized supplementation','plan-3-cta':'Choose Elite',
      'modal-title':'Your access','modal-subtitle':'Drop your email and we’ll take you to secure checkout.','modal-submit-btn':'Continue','modal-note':'Powered by Stripe. We don’t store cards.',
      'footer-rights':'All rights reserved.','footer-disclaimer':'Consult your physician before starting. Results vary.'
    }
  };

  function tr(lang='es'){
    const t = translations[lang];
    for(const id in t){
      const el = document.getElementById(id);
      if(!el) continue;
      if(id === 'meta-title'){ document.title = t[id]; continue; }
      if(id === 'meta-description'){ el.setAttribute('content', t[id]); continue; }
      if(t[id].includes('<span')) el.innerHTML = t[id]; else el.textContent = t[id];
    }
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      tr(btn.dataset.lang);
    });
  });

  // Payment links (create in Stripe Dashboard; these are NOT secrets)
  const PAYMENT_LINKS = {
    starter: '', // e.g., 'https://buy.stripe.com/abcd1234starter'
    pro:     '', // e.g., 'https://buy.stripe.com/abcd1234pro'
    elite:   ''  // e.g., 'https://buy.stripe.com/abcd1234elite'
  };

  // Open modal, capture email, store in Supabase, then redirect to Stripe
  const planButtons = document.querySelectorAll('.select-plan');
  const modal = document.getElementById('onboarding-modal');
  const closeBtn = document.querySelector('.modal-close-btn');
  const form = document.getElementById('onboarding-form');
  const emailInput = document.getElementById('email-input');
  let chosenPlan = null;

  planButtons.forEach(btn => btn.addEventListener('click', () => {
    chosenPlan = btn.dataset.plan;
    modal.style.display = 'grid';
    emailInput.focus();
  }));
  closeBtn && closeBtn.addEventListener('click', () => modal.style.display = 'none');

  form && form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if(!email || !chosenPlan) return;
    // Supabase client with anon key only (set in HTML via CDN)
    try{
      const SUPABASE_URL = window.SUPABASE_URL || ''; // set in Vercel as injected script if desired
      const SUPABASE_ANON = window.SUPABASE_ANON || '';
      if(SUPABASE_URL && SUPABASE_ANON && window.supabase){
        const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);
        await sb.from('leads').insert({ email, plan: chosenPlan, source: 'vital35plus', created_at: new Date().toISOString() });
      }
    }catch(err){ console.warn('Supabase log skipped:', err); }
    // Redirect to Stripe payment link
    const url = PAYMENT_LINKS[chosenPlan];
    if(url){ window.location.href = url; } else { alert('Configura tu Payment Link de Stripe para ' + chosenPlan); }
  });

  // Assistant placeholder
  const assistant = document.getElementById('ai-assistant-btn');
  assistant && assistant.addEventListener('click', () => {
    alert('Asistente IA: pronto aquí con Hugging Face (token en backend).');
  });

  // Default language
  tr('es');
});