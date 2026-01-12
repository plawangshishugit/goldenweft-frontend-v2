"use client";

export default function CopyAddressButton({
  address,
}: {
  address: string;
}) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(address)}
      className="text-xs underline text-gray-700 hover:text-gray-900"
    >
      Copy
    </button>
  );
}
