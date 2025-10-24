// src/app/legal/privacy/page.tsx
export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        At Nexora, we respect your privacy and are committed to protecting your personal data.
      </p>
      <h2 className="text-xl font-bold mb-4">What Data Do We Collect?</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Contact information: name, email, country (when you purchase or subscribe).</li>
        <li>Payment data: processed 100% by Lemon Squeezy (we never store credit cards).</li>
        <li>Technical data: IP address, browser, device (for security and analytics via Plausible).</li>
      </ul>
    </div>
  )
}
