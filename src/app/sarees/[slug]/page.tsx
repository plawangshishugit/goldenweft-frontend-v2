import type { Metadata } from "next";
import SareeDetailClient from "./SareeDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/sarees/${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error();

    const saree = await res.json();

    return {
      title: saree.name,
      description: saree.reason,
      openGraph: {
        title: saree.name,
        description: saree.reason,
        images: [
          {
            url: saree.imageUrl,
            width: 1200,
            height: 630,
            alt: saree.name,
          },
        ],
      },
    };
  } catch {
    return {
      title: "Saree | GoldenWeft",
    };
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ unwrap ON SERVER

  return <SareeDetailClient slug={slug} />;
}
