
// Simple bilingual toggle (EN/ES). Data-driven via data-i18n keys.
const dict = {
  en: {
    hero_title: "Travel, care and equip your pet — globally and without friction.",
    hero_sub: "Bespoke guides, pet‑friendly travel policies, AI helpdesk, nutrition and vetted providers. Premium metallic‑blue UI by Nexora.",
    cta_buy: "Buy Pro Kit US$29",
    cta_checkout: "Checkout",
    section_sell_title: "Sell Your Services (White-Label Pages)",
    section_sell_sub: "Vets, nutritionists, trainers and more. Rent or sell plans globally.",
    providers: "Providers", rentals: "Rentals", sales: "Sales",
    disclaimer: "Disclaimer: Information is provided 'as is'. Travel policies and medical/food advice may change. Always verify with official sources and licensed professionals.",
    footer_rights: "© 2025 PetMatch Global by Nexora Pro. All rights reserved."
  },
  es: {
    hero_title: "Viaja, cuida y equipa a tu mascota — globalmente y sin fricción.",
    hero_sub: "Guías a la medida, políticas de viaje pet‑friendly, helpdesk con IA, nutrición y proveedores verificados. UI azul metálico premium by Nexora.",
    cta_buy: "Comprar Kit Pro US$29",
    cta_checkout: "Pagar",
    section_sell_title: "Vende tus servicios (Páginas en blanco)",
    section_sell_sub: "Veterinarias, nutriólogos, entrenadores y más. Renta o vende planes a nivel global.",
    providers: "Proveedores", rentals: "Rentas", sales: "Ventas",
    disclaimer: "Aviso: La información se entrega 'tal cual'. Las políticas de viaje y el consejo médico/alimentario pueden cambiar. Verifica con fuentes oficiales y profesionales certificados.",
    footer_rights: "© 2025 PetMatch Global por Nexora Pro. Todos los derechos reservados."
  }
};
let currentLang = "es";
function applyI18n(){
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const k = el.getAttribute("data-i18n");
    el.textContent = dict[currentLang][k] || k;
  });
}
function setLang(lang){ currentLang = lang; applyI18n(); localStorage.setItem("lang", lang); }
window.addEventListener("DOMContentLoaded",()=>{
  const saved = localStorage.getItem("lang"); if (saved && dict[saved]) currentLang = saved;
  applyI18n();
});
