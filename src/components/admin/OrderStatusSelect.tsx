"use client";

export default function OrderStatusSelect({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) {
  async function updateStatus(next: string) {
    await fetch("/api/admin/orders/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status: next }),
    });

    window.location.reload();
  }

  return (
    <select
      value={status}
      onChange={(e) => updateStatus(e.target.value)}
      className="mt-1 rounded border px-2 py-1 text-xs"
    >
      <option value="created">Created</option>
      <option value="paid">Paid</option>
      <option value="dispatched">Dispatched</option>
      <option value="delivered">Delivered</option>
    </select>
  );
}
