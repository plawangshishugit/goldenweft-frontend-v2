// components/studio/OptionCard.tsx
type OptionCardProps = {
  title: string;
  isSelected: boolean;
  onSelect: () => void;
};

export default function OptionCard({
  title,
  isSelected,
  onSelect,
}: OptionCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`w-full text-left px-6 py-5 rounded-xl border 
        transition-all duration-300
        ${
          isSelected
            ? "border-gray-900 bg-gray-900 text-white"
            : "border-gray-300 bg-white text-gray-900 hover:border-gray-900"
        }`}
    >
      <span className="text-base font-medium">{title}</span>
    </button>
  );
}
