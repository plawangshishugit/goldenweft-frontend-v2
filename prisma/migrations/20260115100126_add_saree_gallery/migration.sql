-- CreateTable
CREATE TABLE "SareeImage" (
    "id" TEXT NOT NULL,
    "sareeId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SareeImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SareeImage" ADD CONSTRAINT "SareeImage_sareeId_fkey" FOREIGN KEY ("sareeId") REFERENCES "Saree"("id") ON DELETE CASCADE ON UPDATE CASCADE;
