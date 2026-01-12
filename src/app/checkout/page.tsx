"use client";

import { useEffect, useState } from "react";
import AddressStep from "./AddressStep";
import DeliveryStep from "./DeliveryStep";
import OrderSummary from "./OrderSummary";

type CheckoutSaree = {
  slug: string;
  name: string;
  price: number;
};

export default function CheckoutPage() {
  const [saree, setSaree] = useState<CheckoutSaree | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("gw_checkout_saree");
    if (raw) {
      setSaree(JSON.parse(raw));
    }
  }, []);

  if (!saree) {
    return (
      <main className="min-h-screen flex items-center justify-center text-sm text-gray-600">
        No saree selected for checkout.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5F2] px-6 py-12 flex justify-center">
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left — steps */}
        <div className="space-y-10">
          <AddressStep />
          <DeliveryStep />
        </div>

        {/* Right — summary */}
        <OrderSummary saree={saree} />
      </div>
    </main>
  );
}
