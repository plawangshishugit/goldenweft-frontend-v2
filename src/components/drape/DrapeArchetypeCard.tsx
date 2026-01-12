// components/drape/DrapeArchetypeCard.tsx

type Props = {
  title: string;
  description: string;
  imageUrl: string;
  preferred?: boolean;
};

export default function DrapeArchetypeCard({
  title,
  description,
  imageUrl,
  preferred = false,
}: Props) {
  return (
    <div
      className={`relative group rounded-2xl overflow-hidden bg-white transition-all
        border ${preferred ? "border-gray-900" : "border-gray-200"}
        hover:shadow-sm`}
    >
      {/* Very subtle preference marker */}
      {preferred && (
        <span
          className="absolute top-3 left-3 z-10
                     text-[10px] tracking-wide
                     bg-white/90 px-2 py-1 rounded-full
                     font-sans text-gray-700"
        >
          Often preferred
        </span>
      )}

      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover bg-[#EFEDE9]
                    transition-transform duration-500
                    group-hover:scale-[1.02]"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-serif text-lg text-gray-900">
          {title}
        </h3>
        <p className="font-sans text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
