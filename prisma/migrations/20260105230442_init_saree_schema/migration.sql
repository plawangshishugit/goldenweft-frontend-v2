-- CreateTable
CREATE TABLE "Saree" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "fabric" TEXT NOT NULL,
    "weave" TEXT NOT NULL,
    "feel" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "occasions" TEXT[],
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Saree_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Saree_slug_key" ON "Saree"("slug");
