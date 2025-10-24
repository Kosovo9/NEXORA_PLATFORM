// src/app/legal/privacidad/page.tsx
export default function PoliticaPrivacidad() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
      <p className="mb-4">
        En Nexora, respetamos tu privacidad y nos comprometemos a proteger tus datos personales.
      </p>
      <h2 className="text-xl font-bold mb-4">Qué Datos Recopilamos</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Información de contacto: nombre, correo electrónico, país (cuando compras o te suscribes).</li>
        <li>Datos de pago: procesados al 100% por Lemon Squeezy (nunca almacenamos tarjetas de crédito).</li>
        <li>Datos técnicos: dirección IP, navegador, dispositivo (para seguridad y análisis vía Plausible).</li>
      </ul>
    </div>
  )
}
