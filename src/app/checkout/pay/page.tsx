"use client";

import { useEffect } from "react";

export default function PayPage() {
  useEffect(() => {
    async function pay() {
      // 🔹 Get saree details
      const raw = sessionStorage.getItem("gw_checkout_saree");
      if (!raw) return;
      const saree = JSON.parse(raw);

      // 🔹 Get customer details (UPDATED)
      const customerRaw = sessionStorage.getItem("gw_checkout_customer");
      const customer = customerRaw
        ? JSON.parse(customerRaw)
        : { name: "", phone: "", address: "" };

      // 1️⃣ Create order in DB
      const orderRes = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          saree,
          customer, // ✅ REAL CUSTOMER DATA
        }),
      });

      const order = await orderRes.json();

      // 2️⃣ Create Razorpay order
      const rpRes = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          amount: saree.price,
        }),
      });

      const rpOrder = await rpRes.json();

      // 3️⃣ Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: rpOrder.amount,
        currency: "INR",
        name: "GoldenWeft",
        description: saree.name,
        order_id: rpOrder.id,
        handler: function () {
          window.location.href = "/checkout/success";
        },
        modal: {
          ondismiss: function () {
            window.location.href = "/checkout/failure";
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    }

    pay();
  }, []);

  return null;
}
