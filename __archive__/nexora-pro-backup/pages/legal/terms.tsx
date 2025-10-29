import Link from 'next/link';

export default function TermsEN() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-indigo-400 mb-8 inline-block">← Back to Nexora</Link>
        
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        <p className="text-gray-400 mb-8">Last updated: April 5, 2025</p>

        <div className="space-y-6 text-gray-300">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Introduction</h2>
            <p>These Terms govern your use of Nexora Labs' digital products and services (&quot;Platform&quot;) at <strong>nexora.io</strong>. By purchasing or accessing our products, you agree to these Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Digital Products</h2>
            <p>All products (e.g., SaaS-in-a-Box, AI Agent Suite) are digital, non-refundable after 14 days, and licensed (not sold). You receive a non-exclusive, non-transferable license to use the materials for personal or commercial use.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Pricing & Payments</h2>
            <p>All prices are in USD. Payments are processed by <strong>Lemon Squeezy</strong>. We reserve the right to change prices at any time. Subscriptions auto-renew unless canceled.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Refund Policy</h2>
            <p>We offer a <strong>14-day money-back guarantee</strong>. If you don’t launch your SaaS or aren’t satisfied, email us at support@nexora.io for a full refund. No questions asked.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Intellectual Property</h2>
            <p>All content, code, templates, and designs are owned by Nexora Labs. You may not resell, redistribute, or claim ownership of our materials.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Limitation of Liability</h2>
            <p>Our products are provided &quot;as is&quot;. We are not liable for any indirect, incidental, or consequential damages arising from your use of our products.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Governing Law</h2>
            <p>These Terms are governed by the laws of the State of Wyoming, USA, without regard to conflict of law principles.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">8. Changes to Terms</h2>
            <p>We may update these Terms at any time. Continued use of the Platform after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">9. Contact</h2>
            <p>Questions? Contact us at: <strong>legal@nexora.io</strong></p>
          </section>
        </div>
      </div>
    </div>
  );
}