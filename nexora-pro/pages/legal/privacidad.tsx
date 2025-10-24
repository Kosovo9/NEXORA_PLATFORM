import Link from 'next/link';

export default function PrivacyPolicyES() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-indigo-400 mb-8 inline-block">← Volver a Nexora</Link>
        
        <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
        <p className="text-gray-400 mb-8">Última actualización: 5 de abril de 2025</p>

        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-bold mb-3">1. ¿Quiénes somos?</h2>
            <p>Nexora Labs (&quot;nosotros&quot;, &quot;nuestro&quot;) opera la plataforma <strong>nexora.io</strong>. Somos un proveedor de kits digitales para emprendedores en México, Canadá y Estados Unidos.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. ¿Qué datos recopilamos?</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Datos de contacto</strong>: nombre, email, país (al comprar o suscribirte).</li>
              <li><strong>Datos de pago</strong>: procesados 100% por Lemon Squeezy (no almacenamos tarjetas).</li>
              <li><strong>Datos técnicos</strong>: IP, navegador, dispositivo (para seguridad y analytics con Plausible).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. ¿Para qué usamos tus datos?</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Entregarte acceso a tus productos digitales.</li>
              <li>Enviarte actualizaciones y soporte.</li>
              <li>Cumplir con obligaciones fiscales (CFDI en México, 1099 en EE.UU.).</li>
              <li>Proteger nuestra plataforma contra fraudes y bots.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. ¿Con quién compartimos tus datos?</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Lemon Squeezy</strong>: procesador de pagos (certificado PCI-DSS).</li>
              <li><strong>Vercel / Cloudflare</strong>: infraestructura y seguridad.</li>
              <li><strong>Nunca vendemos ni alquilamos tus datos.</strong></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Tus derechos</h2>
            <p>Puedes:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Acceder, corregir o eliminar tus datos.</li>
              <li>Solicitar una copia en formato portable.</li>
              <li>Oponerte al procesamiento.</li>
            </ul>
            <p className="mt-2">Escríbenos a: <strong>privacy@nexora.io</strong></p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Cookies</h2>
            <p>Usamos cookies esenciales para el funcionamiento del sitio. No usamos cookies de rastreo publicitario.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Cambios</h2>
            <p>Actualizaremos esta política si cambia la ley o nuestra plataforma. La versión vigente siempre estará en <code>nexora.io/legal/privacidad</code>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}