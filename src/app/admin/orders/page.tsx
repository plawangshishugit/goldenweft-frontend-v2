import { prisma } from "@/lib/prisma";
// import CopyAddressButton from "@/components/admin/CopyAddressButton";
// import MarkDispatchedButton from "@/components/admin/MarkDispatchedButton";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-[#F7F5F2] px-8 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="space-y-1">
          <h1 className="font-serif text-3xl text-gray-900">
            Orders
          </h1>
          <p className="text-sm text-gray-600">
            Internal order management
          </p>
        </header>

        <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-4">Order ID</th>
                <th>Saree</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Address</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="p-4 font-mono text-xs">
                    {o.id.slice(0, 8)}…
                  </td>

                  <td>{o.sareeName}</td>

                  <td>{o.customerName}</td>

                  <td>
                    <a
                      href={`tel:${o.phone}`}
                      className="text-blue-600 underline"
                    >
                      {o.phone}
                    </a>
                    <a
                      href={`https://wa.me/91${o.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-green-600 underline text-xs"
                    >
                      WhatsApp
                    </a>
                  </td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        o.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {o.status}
                    </span>
                    {/* {o.status === "paid" && <MarkDispatchedButton orderId={o.id} />} */}
                  </td>

                  <td>₹{o.amount.toLocaleString("en-IN")}</td>

                  <td>
                    {new Date(o.createdAt).toLocaleDateString(
                      "en-IN"
                    )}
                  </td>

                  <td>
                    {/* <CopyAddressButton address={o.address} /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
// export default function AdminOrdersPage() {
//   return (
//     <main style={{ padding: 40 }}>
//       <h1>Admin Orders</h1>
//       <p>If you can see this page, routing works.</p>
//     </main>
//   );
// }
