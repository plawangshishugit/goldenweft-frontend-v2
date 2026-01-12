export default function FailurePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F7F5F2] px-6">
      <section className="bg-white rounded-2xl border border-gray-200 p-8 max-w-md space-y-4">
        <h1 className="font-serif text-2xl text-gray-900">
          Payment not completed
        </h1>
        <p className="font-sans text-sm text-gray-600">
          Your payment did not go through. No amount has been deducted from your account.
        </p>
        <a
          href="/checkout"
          className="inline-block mt-4 text-sm underline"
        >
          Try again
        </a>
      </section>
    </main>
  );
}
