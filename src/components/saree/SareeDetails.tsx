// components/saree/SareeDetails.tsx
"use client";

type SareeDetailsProps = {
  fabric: string;
  weave: string;
  feel: string;
  weight: string;
  occasions: string[];
};

export default function SareeDetails({
  fabric,
  weave,
  feel,
  weight,
  occasions,
}: SareeDetailsProps) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
      <h2 className="font-serif text-xl text-gray-900">
        The saree
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DetailItem label="Fabric" value={fabric} />
        <DetailItem label="Weave" value={weave} />
        <DetailItem label="Feel" value={feel} />
        <DetailItem label="Weight" value={weight} />
      </div>

      <div className="space-y-2">
        <p className="font-sans text-sm text-gray-700">
          When this saree belongs
        </p>

        <div className="flex flex-wrap gap-2">
          {occasions.map((o) => (
            <span
              key={o}
              className="font-sans text-xs px-3 py-1 rounded-full border border-gray-300 text-gray-700"
            >
              {o}
            </span>
          ))}
        </div>

        <p className="font-sans text-xs text-gray-600 mt-2">
          Designed to feel appropriate, never excessive.
        </p>
      </div>
    </section>
  );
}

type DetailItemProps = {
  label: string;
  value: string;
};

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="space-y-1">
      <p className="font-sans text-xs text-gray-600">
        {label}
      </p>
      <p className="font-sans text-sm text-gray-900">
        {value}
      </p>
    </div>
  );
}
