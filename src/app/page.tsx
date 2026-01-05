// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F7F5F2] px-6">
      <div className="max-w-xl text-center space-y-8">
        <h1 className="text-3xl md:text-4xl font-serif text-gray-900 leading-snug">
          Sarees chosen with respect for who you are.
        </h1>

        <p className="text-sm text-gray-600">
          Bhagalpuri & Banarasi handloom sarees
        </p>

        <Link
          href="/studio"
          className="inline-block mt-6 px-8 py-3 rounded-full 
                     border border-gray-900 text-gray-900 
                     hover:bg-gray-900 hover:text-white 
                     transition-all duration-300"
        >
          Enter Your Private Saree Studio
        </Link>
      </div>
    </main>
  );
}
