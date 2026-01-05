// components/saree/SareeCard.tsx
"use client";

import { useRouter } from "next/navigation";

type SareeCardProps = {
  name: string;
  region: string;
  imageUrl: string;
  reason: string;
  slug: string;
};

export default function SareeCard({
  name,
  region,
  imageUrl,
  reason,
  slug,
}: SareeCardProps) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
      {/* Image */}
      <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-serif text-lg text-gray-900">
            {name}
          </h3>
          <p className="font-sans text-xs text-gray-600">
            {region}
          </p>
        </div>

        <p className="font-sans text-sm text-gray-700 leading-relaxed">
          {reason}
        </p>

        <button
          onClick={() => router.push(`/sarees/${slug}`)}
          className="font-sans text-sm underline text-gray-800"
        >
          View with care
        </button>
      </div>
    </div>
  );
}
