"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewSareePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    region: "",
    price: "",
    stock: "1",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/admin/create-saree", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      }),
    });

    router.push("/admin/sarees");
    router.refresh();
  }

  return (
    <main className="p-6 max-w-xl space-y-4">
      <h1 className="font-serif text-2xl">Add New Saree</h1>

      <form onSubmit={submit} className="space-y-3">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            value={(form as any)[key]}
            onChange={(e) =>
              setForm({ ...form, [key]: e.target.value })
            }
            className="w-full border rounded px-3 py-2 text-sm"
          />
        ))}

        <button className="rounded-full border py-2 px-4">
          Create Saree
        </button>
      </form>
    </main>
  );
}
