import { useEffect, useState } from "react";

export default function AddressStep() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    sessionStorage.setItem("gw_checkout_customer", JSON.stringify(form));
  }, [form]);

  return (
    <section className="bg-white rounded-2xl border p-6 space-y-4">
      <h2 className="font-serif text-xl">Shipping address</h2>

      <input
        className="checkout-input"
        placeholder="Full name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="checkout-input"
        placeholder="Phone number"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />
      <textarea
        className="checkout-textarea"
        placeholder="Full address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
    </section>
  );
}
