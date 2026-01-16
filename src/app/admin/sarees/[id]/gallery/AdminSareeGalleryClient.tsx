"use client";

import { useEffect, useState } from "react";

type Image = {
  id: string;
  imageUrl: string;
  position: number;
};

export default function AdminSareeGalleryClient({
  sareeId,
}: {
  sareeId: string;
}) {
  const [images, setImages] = useState<Image[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadImages() {
    const res = await fetch(`/api/admin/sarees/${sareeId}/images`);
    const data: Image[] = await res.json();
    setImages(data.sort((a, b) => a.position - b.position));
    console.log("Gallery images:", data);

  }

  useEffect(() => {
    loadImages();
  }, [sareeId]);

  // 🔁 Swap positions safely
  async function swap(index: number, direction: "up" | "down") {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const a = images[index];
    const b = images[targetIndex];

    await Promise.all([
      fetch(`/api/admin/sarees/${sareeId}/images`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageId: a.id, position: b.position }),
      }),
      fetch(`/api/admin/sarees/${sareeId}/images`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageId: b.id, position: a.position }),
      }),
    ]);

    loadImages();
  }

  async function addImage() {
    if (!imageUrl) return;

    setLoading(true);
    await fetch(`/api/admin/sarees/${sareeId}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageUrl,
        position: images.length, // 👈 always append
      }),
    });

    setImageUrl("");
    setLoading(false);
    loadImages();
  }

  async function deleteImage(imageId: string) {
    await fetch(`/api/admin/sarees/${sareeId}/images`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageId }),
    });
    loadImages();
  }

  return (
    <main className="p-8 space-y-8">
      <h1 className="font-serif text-2xl">Saree Gallery</h1>

      {/* Add image */}
      <div className="space-y-2 max-w-md">
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image URL"
          className="w-full border px-3 py-2 rounded"
        />

        <button
          onClick={addImage}
          disabled={loading}
          className="px-4 py-2 rounded bg-black text-white"
        >
          {loading ? "Adding…" : "Add Image"}
        </button>
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div key={img.id} className="space-y-2">
            <img
              src={img.imageUrl}
              alt="gallery"
              className="rounded border"
            />

            <div className="flex justify-between items-center text-xs text-gray-600">
              <div className="flex gap-2">
                <button
                  onClick={() => swap(index, "up")}
                  disabled={index === 0}
                  className="px-2 border rounded disabled:opacity-30"
                >
                  ↑
                </button>

                <button
                  onClick={() => swap(index, "down")}
                  disabled={index === images.length - 1}
                  className="px-2 border rounded disabled:opacity-30"
                >
                  ↓
                </button>
              </div>

              <button
                onClick={() => deleteImage(img.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
