"use client";

export default function CopyAddressButton({
  address,
}: {
  address: string;
}) {
  function copy() {
    navigator.clipboard.writeText(address);
  }

  return (
    <button
      onClick={copy}
      className="text-xs underline text-gray-700 hover:text-gray-900"
    >
      Copy
    </button>
  );
}