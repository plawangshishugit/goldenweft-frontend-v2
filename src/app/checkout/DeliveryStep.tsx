export default function DeliveryStep() {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
      <h2 className="font-serif text-xl text-gray-900">
        Delivery & care
      </h2>

      <p className="font-sans text-sm text-gray-600">
        Each saree is carefully packed and dispatched within 5–7 working days.
      </p>

      <textarea
        placeholder="Any delivery notes or preferences (optional)"
        className="checkout-textarea"
      />
    </section>
  );
}
