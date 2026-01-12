// components/saree/TrustSection.tsx
"use client";

export default function TrustSection() {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <h2 className="font-serif text-xl text-gray-900">
        Our assurance to you
      </h2>

      <div className="space-y-3">
        <p className="font-sans text-sm text-gray-700 leading-relaxed">
          Every saree at GoldenWeft is sourced directly from trusted handloom
          clusters and prepared with care. We work in small batches to maintain
          authenticity and fairness.
        </p>

        <p className="font-sans text-sm text-gray-700 leading-relaxed">
          If something doesn’t feel right once it reaches you, we will help you
          with an exchange or return. We believe comfort includes peace of mind.
        </p>

        <p className="font-sans text-sm text-gray-700 leading-relaxed">
          Should you need guidance before or after your purchase, you can reach
          us directly. We prefer conversations over tickets.
        </p>
      </div>

      <p className="font-sans text-xs text-gray-600">
        Quiet confidence, not loud promises.
      </p>
    </section>
  );
}
