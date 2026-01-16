import { prisma } from "@/lib/prisma";
import StockEditor from "@/components/admin/StockEditor";

export default async function AdminSareesPage() {
  const sarees = await prisma.saree.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-[#F7F5F2] px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="font-serif text-2xl">Manage Sarees</h1>

        <div className="space-y-4">
          {sarees.map((s) => (
            <div
              key={s.id}
              className="bg-white border rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-xs text-gray-600">{s.region}</p>
              </div>

              <StockEditor
                sareeId={s.id}
                stock={Number.isFinite(s.stock) ? s.stock : 0}
                isActive={Boolean(s.isActive)}
              />
                        <a
            href={`/admin/sarees/${s.id}/gallery`}
            className="text-sm text-blue-600 underline"
          >
            Manage Gallery
          </a>
            </div>
            
          ))}

        </div>
        
      </div>
    </main>
  );
}
