import { prisma } from "@/lib/prisma";
import EditSareeForm from "@/components/admin/EditSareeForm";

export default async function EditSareePage({
  params,
}: {
  params: { id: string };
}) {
  const saree = await prisma.saree.findUnique({
    where: { id: params.id },
  });

  if (!saree) {
    return <p className="p-6">Saree not found</p>;
  }

  return (
    <main className="p-6 max-w-3xl space-y-6">
      <h1 className="font-serif text-2xl">Edit Saree</h1>
      <EditSareeForm saree={saree} />
    </main>
  );
}
