"use client";

export default function CheckoutSuccess() {
  const orderRaw =
    typeof window !== "undefined"
      ? sessionStorage.getItem("gw_last_order")
      : null;

  const order = orderRaw ? JSON.parse(orderRaw) : null;

  const whatsappMessage = order
    ? encodeURIComponent(
        `GoldenWeft ✨\n\nYour order for ${order.sareeName} has been confirmed.\n\nWe will contact you shortly to assist with delivery and care.\n\n— GoldenWeft`
      )
    : "";

  const whatsappUrl = order
    ? `https://wa.me/91${order.phone}?text=${whatsappMessage}`
    : "#";

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F7F5F2]">
      <div className="bg-white p-8 rounded-2xl border max-w-md text-center space-y-5">
        <h1 className="font-serif text-2xl text-gray-900">
          Order confirmed
        </h1>

        <p className="text-sm text-gray-600">
          Thank you for choosing GoldenWeft.
          Your saree is now being prepared with care.
        </p>

        {order && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center
                       rounded-full border border-gray-900
                       px-6 py-3 text-sm font-sans
                       hover:bg-gray-900 hover:text-white
                       transition-all"
          >
            Message us on WhatsApp for assistance
          </a>
        )}

        <p className="text-xs text-gray-500 italic">
          We usually respond within a few hours.
        </p>
      </div>
    </main>
  );
}
