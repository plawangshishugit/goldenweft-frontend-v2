"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Order = {
  id: string;
  status: "created" | "pending" | "paid" | "dispatched" | "delivered";
};

const messages = [
  "Confirming payment",
  "Finalizing order",
  "Preparing confirmation",
];

const ease = [0.22, 1, 0.36, 1];
const MAX_ATTEMPTS = 12; // ~24 seconds

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const i = setInterval(() => {
      setMessageIndex((m) => (m + 1) % messages.length);
    }, 3600);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const orderId = sessionStorage.getItem("gw_last_order_id");
    if (!orderId) return;

    let attempts = 0;

    async function check() {
      try {
        const res = await fetch("/api/orders/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });

        if (!res.ok) return;

        const data: Order = await res.json();
        setOrder(data);

        if (data.status === "paid") {
          clearInterval(interval);
        }

        attempts++;
        if (attempts >= MAX_ATTEMPTS) {
          setTimedOut(true);
          clearInterval(interval);
        }
      } catch {
        // silent
      }
    }

    check();
    const interval = setInterval(check, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease }}
        className="max-w-md bg-white p-10 rounded-2xl text-center space-y-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
      >
        <AnimatePresence mode="wait">
          {order?.status === "paid" ? (
            <motion.div key="paid" className="space-y-6">
              <h1 className="text-xl font-medium">Order confirmed</h1>
              <p className="text-sm text-gray-600">
                Your payment was successful.
              </p>
              <a
                href="/track-order"
                className="inline-block rounded-lg bg-gray-900 px-6 py-3 text-sm text-white"
              >
                Track your order
              </a>
            </motion.div>
          ) : timedOut ? (
            <motion.div key="timeout" className="space-y-6">
              <h1 className="text-xl font-medium">Order received</h1>
              <p className="text-sm text-gray-600">
                We’re confirming your payment. This may take a moment.
              </p>
              <a
                href="/track-order"
                className="inline-block rounded-lg border border-gray-900 px-6 py-3 text-sm"
              >
                Track order status
              </a>
            </motion.div>
          ) : (
            <motion.div key="loading" className="space-y-6">
              <div className="mx-auto h-[2px] w-40 bg-gray-200 overflow-hidden rounded-full">
                <motion.div
                  className="h-full w-1/2 bg-gray-900"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                />
              </div>

              <motion.h1 className="text-base font-medium">
                {messages[messageIndex]}
              </motion.h1>

              <p className="text-xs text-gray-500">
                Please don’t close this window.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </main>
  );
}
