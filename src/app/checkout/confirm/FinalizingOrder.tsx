export default function PreparingSaree() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F7F5F2] px-6">
      <div className="text-center space-y-4 animate-fade-soft">
        <p className="font-serif text-xl text-gray-900">
         Finalising your order…
        </p>

        <p className="text-sm text-gray-600 italic">
          Verifying craftsmanship, price, and availability
        </p>

        <div className="mt-6 h-[2px] w-40 mx-auto overflow-hidden bg-gray-200 rounded">
          <div className="h-full w-1/3 bg-gray-800 animate-silk-flow" />
        </div>
      </div>
    </main>
  );
}
