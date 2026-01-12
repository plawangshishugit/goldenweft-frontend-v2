/*
  Warnings:

  - Added the required column `borderWeight` to the `Saree` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorTone` to the `Saree` table without a default value. This is not possible if the table is not empty.
  - Added the required column `drape` to the `Saree` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Saree" ADD COLUMN     "borderWeight" TEXT NOT NULL,
ADD COLUMN     "colorTone" TEXT NOT NULL,
ADD COLUMN     "drape" TEXT NOT NULL;
