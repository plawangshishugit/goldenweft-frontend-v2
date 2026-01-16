"use client";

import { useEffect } from "react";
import CheckoutCeremony from "@/components/checkout/CheckoutCeremony";

export default function PayPage() {
  useEffect(() => {
    // 🛑 Prevent double execution (refresh / back / retry safety)
    if (sessionStorage.getItem("gw_payment_started")) return;
    sessionStorage.setItem("gw_payment_started", "true");

    async function pay() {
      // 🧵 Fetch saree
      const raw = sessionStorage.getItem("gw_checkout_saree");
      if (!raw) {
        sessionStorage.removeItem("gw_payment_started");
        window.location.href = "/sarees";
        return;
      }
      const saree = JSON.parse(raw);

      // 🧵 Fetch customer
      const customerRaw = sessionStorage.getItem("gw_checkout_customer");
      if (!customerRaw) {
        sessionStorage.removeItem("gw_payment_started");
        window.location.href = "/checkout";
        return;
      }
      const customer = JSON.parse(customerRaw);

      // ⏳ Hard fail-safe (network / SDK / user device)
      const failSafe = setTimeout(() => {
        sessionStorage.removeItem("gw_payment_started");
        window.location.href = "/checkout/failure";
      }, 30000); // 30s (Stripe-like)

      try {
        // 1️⃣ Create DB order
        const orderRes = await fetch("/api/orders/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ saree, customer }),
        });

        if (!orderRes.ok) throw new Error("Order creation failed");
        const order = await orderRes.json();

        if (!order?.id) throw new Error("Order ID missing");

        sessionStorage.setItem("gw_last_order_id", order.id);
        sessionStorage.setItem("gw_checkout_order_id", order.id);

        // 2️⃣ Create Razorpay order
        const rpRes = await fetch("/api/payments/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: order.id,
            amount: saree.price,
          }),
        });

        if (!rpRes.ok) throw new Error("Razorpay order failed");
        const rpOrder = await rpRes.json();

        // 🎭 Luxury pacing before payment sheet
        setTimeout(() => {
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: rpOrder.amount,
            currency: "INR",
            name: "GoldenWeft",
            description: saree.name,
            order_id: rpOrder.id,

            handler: function (response: any) {
              console.log("✅ Razorpay handler called");
              console.log("payment_id:", response.razorpay_payment_id);
              console.log("order_id:", response.razorpay_order_id);
              console.log("signature:", response.razorpay_signature);

              // DO NOT mark paid here — webhook does that
              window.location.href = "/checkout/success";
            },

            modal: {
              ondismiss: function () {
                console.warn("⚠️ Razorpay modal dismissed");
                window.location.href = "/checkout/failure";
              },
            },
          };
          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        }, 900);
      } catch (err) {
        console.error("❌ Payment error:", err);
        sessionStorage.removeItem("gw_payment_started");
        window.location.href = "/checkout/failure";
      }
    }

    pay();
  }, []);

  // 🕊️ Ceremony is ALWAYS visible during processing
  return (
    <CheckoutCeremony
      title="Preparing secure payment"
      subtitle="Your saree is being carefully reserved for you"
    />
  );
}
