"use client";

import { useEffect, useState } from "react";
import CheckoutPreparation from "@/components/checkout/CheckoutPreparation";
import FinalizingOrder from "./FinalizingOrder";

type CheckoutSaree = {
  slug: string;
  name: string;
  price: number;
};

export default function ConfirmOrderPage() {
  const [saree, setSaree] = useState<CheckoutSaree | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Small delay = intentional ceremony (not technical loading)
    const timer = setTimeout(() => {
      const raw = sessionStorage.getItem("gw_checkout_saree");
      if (raw) {
        setSaree(JSON.parse(raw));
      }
      setLoading(false);
    }, 700); // 👈 smooth, premium feel

    return () => clearTimeout(timer);
  }, []);

  // 1️⃣ While loading → show preparation animation
  if (loading) {
    return <CheckoutPreparation />;
  }

  // 2️⃣ After loading, if still no saree → real error
  if (!saree) {
    return  <FinalizingOrder />;
  }

  // 3️⃣ Normal confirm page
  return (
    <main className="min-h-screen bg-[#F7F5F2] px-6 py-12 flex justify-center">
      <section className="w-full max-w-xl bg-white rounded-2xl border border-gray-200 p-8 space-y-6">
        <h1 className="font-serif text-2xl text-gray-900">
          Confirm your order
        </h1>

        <div className="space-y-2">
          <p className="font-sans text-sm text-gray-600">
            You are placing an order for:
          </p>
          <p className="font-sans text-base text-gray-900">
            {saree.name}
          </p>
        </div>

        <div className="flex justify-between border-t pt-4">
          <span className="font-sans text-sm text-gray-600">
            Order total
          </span>
          <span className="font-serif text-lg text-gray-900">
            ₹{saree.price.toLocaleString("en-IN")}
          </span>
        </div>

        <p className="font-sans text-xs text-gray-500">
          This saree is handcrafted and prepared upon confirmation.
        </p>

        <button
          onClick={() => {
            window.location.href = "/checkout/pay";
          }}
          className="w-full rounded-full border border-gray-900 py-4
                     font-sans text-sm hover:bg-gray-900 hover:text-white
                     transition-all"
        >
          Proceed to secure payment
        </button>
      </section>
    </main>
  );
}
