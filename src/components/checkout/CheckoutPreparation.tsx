export default function CheckoutPreparation() {
  return (
    <main className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">
      <div className="text-center space-y-6 max-w-sm">
        <p className="font-serif text-lg text-gray-900">
          Preparing your saree
        </p>

        <p className="font-sans text-xs text-gray-500 italic">
          Checking weave, fold, and availability
        </p>

        {/* Subtle ceremonial animation */}
        <div className="flex justify-center gap-2 mt-6">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150" />
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300" />
        </div>
      </div>
    </main>
  );
}
