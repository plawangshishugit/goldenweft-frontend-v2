"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/me").then((res) => {
      if (res.ok) {
        router.replace("/admin/orders");
      }
    });
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F7F5F2]">
      <form
        action="/api/admin/login"
        method="POST"
        className="bg-white border rounded-xl p-6 w-full max-w-sm space-y-4"
      >
        <h1 className="font-serif text-xl text-center">Admin Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full border rounded px-3 py-2 text-sm"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full border rounded px-3 py-2 text-sm"
        />

        <button
          type="submit"
          className="w-full rounded-full border border-gray-900 py-2 text-sm hover:bg-gray-900 hover:text-white transition"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}
