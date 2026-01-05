// components/saree/SareeHero.tsx
"use client";

type SareeHeroProps = {
  name: string;
  region: string;
  imageUrl: string;
};

export default function SareeHero({
  name,
  region,
  imageUrl,
}: SareeHeroProps) {
  return (
    <section className="space-y-4">
      {/* Image */}
      <div className="w-full overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Title */}
      <div className="space-y-1">
        <h1 className="font-serif text-2xl md:text-3xl text-gray-900">
          {name}
        </h1>
        <p className="font-sans text-sm text-gray-600">
          {region}
        </p>
      </div>
    </section>
  );
}
