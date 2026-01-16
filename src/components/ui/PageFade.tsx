"use client";

export default function PageFade({ active }: { active: boolean }) {
  return (
    <div
      className={`
        fixed inset-0 z-50 pointer-events-none
        transition-opacity duration-500 ease-in-out
        ${active ? "opacity-100 bg-black" : "opacity-0"}
      `}
    />
  );
}
