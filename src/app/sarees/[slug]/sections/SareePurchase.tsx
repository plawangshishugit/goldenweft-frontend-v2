"use client";

import { useState } from "react";
import PageFade from "../../../../components/ui/PageFade";
import { Saree } from "../types";

export default function SareePurchase({ saree }: { saree: Saree }) {
  const [adding, setAdding] = useState(false);

  if (!saree.isActive) {
    return (
      <p className="text-sm text-gray-600 italic text-center">
        This piece is currently unavailable.
      </p>
    );
  }

  if (saree.stock === 0) {
    return (
      <p className="text-sm text-gray-600 italic text-center">
        Currently out of stock.
      </p>
    );
  }

  const handleReserve = () => {
    if (adding) return;

    setAdding(true);

    sessionStorage.setItem(
      "gw_checkout_saree",
      JSON.stringify({
        sareeId: saree.id,
        slug: saree.slug,
        name: saree.name,
        price: saree.price,
      })
    );

    setTimeout(() => {
      window.location.href = "/checkout";
    }, 700); // deliberate, luxurious pause
  };

  return (
    <>
      <PageFade active={adding} />

      <div className="space-y-2">
        <button
          disabled={adding}
          aria-busy={adding}
          onClick={handleReserve}
          className={`
            relative overflow-hidden
            w-full rounded-full border py-4 font-sans text-sm
            transition-all duration-300 ease-out
            ${
              adding
                ? "bg-gray-900 text-white cursor-wait shadow"
                : "border-gray-900 hover:bg-gray-900 hover:text-white hover:shadow-lg hover:-translate-y-[1px] active:translate-y-0"
            }
          `}
        >
          {/* Shimmer Layer */}
          {adding && (
            <span className="
              absolute inset-0
              animate-gw-shimmer
              bg-gradient-to-r from-transparent via-white/20 to-transparent
            " />
          )}

          <span className="relative z-10">
            {adding ? "Reserving your piece…" : "Reserve this saree"}
          </span>
        </button>

        {adding && (
          <p className="text-xs text-center text-gray-500 tracking-wide">
            This piece is held exclusively for you for 10 minutes
          </p>
        )}
      </div>
    </>
  );
}
