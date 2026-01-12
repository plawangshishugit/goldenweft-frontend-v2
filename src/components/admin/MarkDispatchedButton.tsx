"use client";

export default function MarkDispatchedButton({ orderId }: { orderId: string }) {
  async function mark() {
    await fetch("/api/admin/mark-dispatched", {
      method: "POST",
      body: JSON.stringify({ orderId }),
    });
    window.location.reload();
  }

  return (
    <button
      onClick={mark}
      className="text-xs underline text-blue-700"
    >
      Mark dispatched
    </button>
  );
}
