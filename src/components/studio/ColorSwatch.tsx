// components/studio/ColorSwatch.tsx
type ColorSwatchProps = {
  label: string;
  color: string;
  isSelected: boolean;
  onToggle: () => void;
};

export default function ColorSwatch({
  label,
  color,
  isSelected,
  onToggle,
}: ColorSwatchProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all
        ${
          isSelected
            ? "border-gray-900 bg-gray-900 text-white"
            : "border-gray-300 bg-white text-gray-900 hover:border-gray-900"
        }`}
    >
      <span
        className="w-4 h-4 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-sm">{label}</span>
    </button>
  );
}
