"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit() {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      window.location.href = "/admin/orders";
    } else {
      setError("Invalid credentials");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F7F5F2]">
      <div className="bg-white p-8 rounded-2xl border max-w-sm space-y-4">
        <h1 className="font-serif text-2xl">Admin Login</h1>

        <input
          className="checkout-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="checkout-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          onClick={submit}
          className="w-full rounded-full border py-3 hover:bg-gray-900 hover:text-white transition"
        >
          Login
        </button>
      </div>
    </main>
  );
}
