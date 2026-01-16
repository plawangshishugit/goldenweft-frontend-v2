"use client";

import { useState } from "react";

type Order = {
  id: string;
  sareeName: string;
  status: string;
  createdAt: string;
};

export default function TrackOrderPage() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function track() {
    setLoading(true);
    setError("");
    setOrders([]);

    try {
      const res = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid server response");
      }
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch orders");
      }

      setOrders(data.orders || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F5F2] px-6 py-16 flex justify-center">
      <section className="w-full max-w-md bg-white rounded-2xl border p-6 space-y-6">
        <h1 className="font-serif text-2xl text-gray-900">
          Track your order
        </h1>

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          className="w-full border rounded px-4 py-3 text-sm"
        />

        <button
          onClick={track}
          disabled={loading}
          className="w-full rounded-full border border-gray-900 py-3 text-sm hover:bg-gray-900 hover:text-white transition"
        >
          {loading ? "Checking…" : "Track"}
        </button>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {!loading && orders.length === 0 && phone && (
          <p className="text-sm text-gray-500">
            No active orders found for this number.
          </p>
        )}

        {orders.map((o) => (
          <div
            key={o.id}
            className="border rounded-lg p-4 space-y-1 text-sm"
          >
            <p className="font-medium text-gray-900">
              Saree: {o.sareeName}
            </p>
            <p className="text-gray-600">
              Status: <strong>{o.status}</strong>
            </p>
            <p className="text-xs text-gray-500">
              Ordered on{" "}
              {new Date(o.createdAt).toLocaleDateString("en-IN")}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
