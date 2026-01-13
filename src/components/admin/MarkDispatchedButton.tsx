"use client";

export default function MarkDispatchedButton({
  orderId,
}: {
  orderId: string;
}) {
  async function mark() {
    await fetch("/api/admin/orders/dispatch", {
      method: "POST",
      body: JSON.stringify({ orderId }),
    });
    location.reload();
  }

  return (
    <button
      onClick={mark}
      className="ml-2 text-xs underline text-purple-600"
    >
      Mark dispatched
    </button>
  );
}
