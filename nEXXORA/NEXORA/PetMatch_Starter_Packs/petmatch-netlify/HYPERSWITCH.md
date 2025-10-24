
# Hyperswitch Integration (opcional rápido)
- Si ya tienes un Payment Link en Hyperswitch, define `HYPERSWITCH_PAYMENT_LINK` en el entorno
  y cambia el botón de compra por:
  <button onclick="location.href='${HYPERSWITCH_PAYMENT_LINK}'">Pagar con Hyperswitch</button>
- Para cargos dinámicos, usa su API desde las funciones backend (Netlify/Vercel/CF).
