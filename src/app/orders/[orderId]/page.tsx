"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Order = {
  id: string;
  sareeName: string;
  status: string;
  createdAt: string;
};

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/orders/${orderId}`);
      if (!res.ok) return;
      setOrder(await res.json());
    }
    load();
  }, [orderId]);

  if (!order) return null;

  return (
    <main className="min-h-screen bg-[#F7F5F2] px-6 py-20 flex justify-center">
      <article className="max-w-md space-y-8 text-center">
        <h1 className="font-serif text-2xl text-gray-900">
          Order in progress
        </h1>

        <p className="text-sm text-gray-600">
          {order.sareeName}
        </p>

        <div className="border rounded-xl bg-white p-6 space-y-4">
          <StatusLine status={order.status} />

          <p className="text-xs text-gray-500">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <p className="text-xs text-gray-500 italic">
          Updates will be shared via WhatsApp
        </p>
      </article>
    </main>
  );
}

function StatusLine({ status }: { status: string }) {
  const map: Record<string, string> = {
    created: "Order received",
    paid: "Saree reserved",
    dispatched: "On its way to you",
    delivered: "Delivered",
  };

  return (
    <div className="font-serif text-lg text-gray-900">
      {map[status] ?? "Processing"}
    </div>
  );
}
