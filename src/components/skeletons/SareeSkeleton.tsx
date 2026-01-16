export default function SareeSkeleton() {
  return (
    <main className="min-h-screen bg-[#F7F5F2] px-6 py-12 flex justify-center">
      <article className="w-full max-w-2xl space-y-10 animate-pulse">
        {/* Hero */}
        <div className="h-96 bg-gray-200 rounded-3xl" />

        {/* Title */}
        <div className="space-y-3">
          <div className="h-6 w-2/3 bg-gray-200 rounded" />
          <div className="h-4 w-1/3 bg-gray-200 rounded" />
        </div>

        {/* Gallery */}
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-72 w-56 bg-gray-200 rounded-2xl flex-shrink-0"
            />
          ))}
        </div>

        {/* Reason */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
        </div>

        {/* Details */}
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 w-1/2 bg-gray-200 rounded" />
          ))}
        </div>

        {/* Price */}
        <div className="h-20 bg-gray-200 rounded-2xl" />

        {/* CTA */}
        <div className="h-14 bg-gray-300 rounded-full" />
      </article>
    </main>
  );
}
