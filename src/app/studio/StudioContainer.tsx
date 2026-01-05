// app/studio/StudioContainer.tsx
"use client";

type StudioContainerProps = {
  children: React.ReactNode;
};

export default function StudioContainer({ children }: StudioContainerProps) {
  return (
    <main className="min-h-screen bg-[#F7F5F2] px-6 py-12 flex justify-center">
      <div className="w-full max-w-xl">
        {children}
      </div>
    </main>
  );
}
