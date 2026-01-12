type Props = {
  saree: {
    name: string;
    price: number;
  };
};

export default function OrderSummary({ saree }: Props) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <h2 className="font-serif text-xl text-gray-900">
        Order summary
      </h2>

      <div className="space-y-1">
        <p className="font-sans text-sm text-gray-800">{saree.name}</p>
        <p className="font-sans text-sm text-gray-500">
          Handcrafted, limited piece
        </p>
      </div>

      <div className="border-t pt-4 flex justify-between items-center">
        <span className="font-sans text-sm text-gray-600">Total</span>
        <span className="font-serif text-lg text-gray-900">
          ₹{saree.price.toLocaleString("en-IN")}
        </span>
      </div>

      <button
        onClick={() => {
          window.location.href = "/checkout/confirm";
        }}
        className="w-full mt-4 rounded-full border border-gray-900 py-3
                  font-sans text-sm hover:bg-gray-900 hover:text-white
                  transition-all"
      >
        Review & confirm order
      </button>
      <p className="text-xs text-gray-500 italic text-center mt-4">
        You will not be charged until payment is securely confirmed.
      </p>
    </section>
  );
}
