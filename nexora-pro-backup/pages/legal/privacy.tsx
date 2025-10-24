import { NextPage } from 'next'

const PrivacyPolicy: NextPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
        <p className="mb-4">
          At Nexora, we respect your privacy and are committed to protecting your personal data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">2. What Data Do We Collect?</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Contact information</strong>: name, email, country (when you purchase or subscribe).</li>
          <li><strong>Payment data</strong>: processed 100% by Lemon Squeezy (we never store credit cards).</li>
          <li><strong>Technical data</strong>: IP address, browser, device (for security and analytics via Plausible).</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">3. How We Use Your Data</h2>
        <p className="mb-4">
          We use your data to provide our services, process payments, and improve our products.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">4. Data Security</h2>
        <p className="mb-4">
          All payment data is handled by Lemon Squeezy, PCI-DSS compliant. We use Cloudflare WAF for additional protection.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">5. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us at support@nexora.io.
        </p>
      </section>
    </div>
  )
}

export default PrivacyPolicy