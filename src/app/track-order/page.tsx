"use client";

import { useState } from "react";

export default function TrackOrderPage() {
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");

  function humanStatus(status: string) {
    if (status === "created") return "Order received";
    if (status === "paid") return "Payment confirmed";
    if (status === "dispatched") return "Dispatched";
    return status;
  }

  async function submit() {
    setError("");
    const res = await fetch("/api/orders/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    if (!res.ok) {
      setError("No order found for this number");
      return;
    }

    setOrder(await res.json());
  }

  return (
    <main className="min-h-screen bg-[#F7F5F2] flex justify-center items-center px-6">
      <div className="bg-white p-8 rounded-2xl border max-w-md w-full space-y-4">
        <h1 className="font-serif text-2xl">Track your order</h1>

        <input
          className="checkout-input"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full rounded-full border py-3 hover:bg-gray-900 hover:text-white transition"
        >
          Track
        </button>

        {error && <p className="text-sm text-red-600">{error}</p>}

        {order && (
          <div className="text-sm space-y-2 pt-4">
            <p><strong>Saree:</strong> {order.sareeName}</p>
            <p>
              <strong>Status:</strong> {humanStatus(order.status)}
            </p>
            <p className="italic text-gray-600">
              We’ll contact you for delivery updates.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
