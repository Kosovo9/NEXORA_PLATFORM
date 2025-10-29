import Link from 'next/link';

export default function SaaSInABox() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link href="/" className="text-indigo-400 mb-6 inline-block">← Back to Nexora</Link>
        <h1 className="text-4xl font-bold mb-4">SaaS-in-a-Box</h1>
        <p className="text-xl text-gray-300 mb-8">Launch your SaaS in 24 hours. No code. No stress.</p>
        
        <div className="bg-gray-800 p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-4">What's Included</h2>
          <ul className="space-y-2">
            <li>• Premium Landing Page (Next.js + Tailwind)</li>
            <li>• Proven Funnel (5.2% Conversion Rate)</li>
            <li>• 30 AI Templates (emails, ads, SOPs)</li>
            <li>• Analytics Setup (Plausible)</li>
            <li>• Lifetime Support in Nexora Pro Community</li>
          </ul>
        </div>

        <div className="text-3xl font-bold mb-6">$297 one-time</div>
        <Link
          href="https://checkout.lemonsqueezy.com/buy/YOUR_LEMON_SQUEEZY_PRODUCT_ID"
          className="block bg-indigo-600 hover:bg-indigo-700 text-center py-4 rounded-lg font-bold text-lg"
        >
          Buy Now →
        </Link>

        <p className="mt-6 text-gray-400">
          14-day money-back guarantee. Launch or 100% refund.
        </p>
      </div>
    </div>
  );
}
