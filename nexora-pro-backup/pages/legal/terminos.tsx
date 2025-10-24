import Link from 'next/link';

export default function TermsES() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-indigo-400 mb-8 inline-block">← Volver a Nexora</Link>
        
        <h1 className="text-3xl font-bold mb-6">Términos y Condiciones</h1>
        <p className="text-gray-400 mb-8">Última actualización: 5 de abril de 2025</p>

        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Introducción</h2>
            <p>Estos Términos rigen tu uso de los productos y servicios digitales de Nexora Labs (&quot;Plataforma&quot;) en <strong>nexora.io</strong>. Al comprar o acceder a nuestros productos, aceptas estos Términos.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Productos Digitales</h2>
            <p>Todos los productos (ej. SaaS-in-a-Box, AI Agent Suite) son digitales, no reembolsables después de 14 días, y se otorgan bajo licencia (no venta). Recibes una licencia no exclusiva e intransferible para uso personal o comercial.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Precios y Pagos</h2>
            <p>Todos los precios están en USD. Los pagos son procesados por <strong>Lemon Squeezy</strong>. Nos reservamos el derecho de cambiar precios en cualquier momento. Las suscripciones se renuevan automáticamente salvo que las canceles.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Política de Reembolso</h2>
            <p>Ofrecemos una <strong>garantía de devolución de 14 días</strong>. Si no lanzas tu SaaS o no estás satisfecho, escríbenos a support@nexora.io para un reembolso completo. Sin preguntas.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Propiedad Intelectual</h2>
            <p>Todo el contenido, código, plantillas y diseños son propiedad de Nexora Labs. No puedes revender, redistribuir ni reclamar propiedad de nuestros materiales.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Limitación de Responsabilidad</h2>
            <p>Nuestros productos se entregan &quot;tal cual&quot;. No somos responsables por daños indirectos, incidentales o consecuentes derivados de tu uso de nuestros productos.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Ley Aplicable</h2>
            <p>Estos Términos se rigen por las leyes del Estado de Wyoming, EE.UU., sin considerar conflictos de leyes.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Cambios en los Términos</h2>
            <p>Podemos actualizar estos Términos en cualquier momento. El uso continuo de la Plataforma tras cambios implica aceptación.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Contacto</h2>
            <p>¿Preguntas? Contáctanos en: <strong>legal@nexora.io</strong></p>
          </section>
        </div>
      </div>
    </div>
  );
}