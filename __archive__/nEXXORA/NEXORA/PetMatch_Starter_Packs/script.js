// Simple ES/EN text switcher
const dict = {
  en: {
    nav_services: "Services",
    nav_portfolio: "Portfolio",
    nav_pricing: "Pricing",
    nav_how: "How it works",
    nav_faqs: "FAQs",
    hero_title: "Restore your memories and create a hug video from a photo",
    hero_sub: "Express delivery (30–90 min). Plans from MXN $200. WhatsApp support.",
    cta_whatsapp: "Start on WhatsApp",
    cta_pricing: "See pricing",
    badge_fast: "Same-day delivery",
    badge_secure: "Private & secure process",
    badge_revisions: "1 revision included",
    svc_title: "Express services",
    svc_hug: "Hug video from one photo",
    svc_hug_desc: "We use advanced AI to turn a photo into a realistic video where two people stand and hug, preserving their facial identity.",
    svc_restore: "Photo restoration",
    svc_restore_desc: "Scratch, noise and color repair. We recover detail without plastic skin; identity and texture preserved.",
    svc_effects: "Pro effects & enhancement",
    svc_effects_desc: "Color grading, clean background, print-ready crops, and marketplace/social variants.",
    port_title: "Portfolio (before / after)",
    port_note: "*Demo examples. Send your photo on WhatsApp for a quick quote.",
    pricing_title: "Plans & pricing",
    p1_title: "Basic",
    p1_1: "1 restored photo (web + print)",
    p1_2: "Delivery in 60–90 min",
    p1_3: "1 light revision",
    p2_title: "Pro",
    p2_1: "1 restored photo + 1 hug video (6–8s)",
    p2_2: "Optimized for Facebook Marketplace",
    p2_3: "Delivery in 45–75 min",
    p3_title: "Premium",
    p3_1: "Up to 3 photos + 1 hug video",
    p3_2: "Advanced color and fine retouch",
    p3_3: "Delivery in 2–4 hours",
    buy_now: "Buy now",
    pay_hint: "Payment methods: SPEI transfer, OXXO Pay, Mercado Pago. Ask for a secure link via WhatsApp.",
    flow_title: "How it works",
    flow_1: "<b>Send photo</b>: share your image on WhatsApp and pick a plan.",
    flow_2: "<b>Validation</b>: we confirm scope & ETA; secure payment.",
    flow_3: "<b>Production</b>: we restore and/or generate the hug video with AI.",
    flow_4: "<b>Delivery</b>: final files + 1 light revision.",
    faq1_q: "Do you preserve facial features?",
    faq1_a: "Yes. We prioritize 1:1 identity (age, features, hair, skin tone). No plastic look.",
    faq2_q: "Can I request changes?",
    faq2_a: "Includes 1 minor revision (color/detail). Major structural changes are quoted separately.",
    faq3_q: "What format do you deliver?",
    faq3_a: "JPG/PNG in high res and MP4 1080p or 4K (per plan). Social + print variants.",
    disclaimer: "*We only work with photos you own or with permission. No deepfakes or impersonations."
  }
};

const btnES = document.getElementById('switch-es');
const btnEN = document.getElementById('switch-en');

btnES?.addEventListener('click', () => {
  setLang('es');
});
btnEN?.addEventListener('click', () => {
  setLang('en');
});

function setLang(lang){
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if(lang === 'en'){
      el.innerHTML = (dict.en[key] || el.innerHTML);
    } else {
      // Spanish is the default content already present
      el.innerHTML = el.innerHTML; 
    }
  });
  btnES?.classList.toggle('active', lang==='es');
  btnEN?.classList.toggle('active', lang==='en');
}

// Update mail and WhatsApp placeholders easily
const whatsappLinks = ['cta-whatsapp','buy-p1','buy-p2','buy-p3','cta-bottom'];
const phoneMX = '521234567890'; // <- REEMPLAZA con tu número
whatsappLinks.forEach(id=>{
  const a = document.getElementById(id);
  if(a && a.href.includes('wa.me/521234567890')){
    a.href = a.href.replace('521234567890', phoneMX);
  }
});
const mail = 'hola@tusitio.mx'; // <- REEMPLAZA
document.getElementById('mail-link').href = `mailto:${mail}`;
document.getElementById('mail-link').textContent = mail;
