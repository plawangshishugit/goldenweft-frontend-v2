// components/saree/ClearPersonalization.tsx
"use client";

export default function ClearPersonalization() {
  async function clearSession() {
    await fetch("/api/trial/session/clear", { method: "POST" });
    window.location.reload();
  }

  return (
    <button
      onClick={clearSession}
      className="font-sans text-xs underline text-gray-600"
    >
      View without personalisation
    </button>
  );
}
