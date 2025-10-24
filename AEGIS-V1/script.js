document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const mainCtaButton = document.getElementById('cta-main-button');
    const pricingCtaButton = document.getElementById('cta-pricing-button');
    
    // Oculta la pantalla de carga después de 1 segundo
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 1000);
    
    // Reemplaza con tu URL de Stripe
    const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/test_1234567890'; // CAMBIAR ESTO
    
    // Botones de CTA
    mainCtaButton.addEventListener('click', (e ) => {
        e.preventDefault();
        window.location.href = STRIPE_PAYMENT_LINK;
    });
    
    pricingCtaButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = STRIPE_PAYMENT_LINK;
    });
    
    // Cambio de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            console.log('Idioma cambiado a:', btn.dataset.lang);
        });
    });
});
