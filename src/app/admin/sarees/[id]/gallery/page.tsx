import AdminSareeGalleryClient from "./AdminSareeGalleryClient";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ IMPORTANT

  return <AdminSareeGalleryClient sareeId={id} />;
}
