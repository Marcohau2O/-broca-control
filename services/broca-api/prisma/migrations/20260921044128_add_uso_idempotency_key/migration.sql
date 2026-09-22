/*
  Warnings:

  - A unique constraint covering the columns `[idempotencyKey]` on the table `UsoInstrumento` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UsoInstrumento" ADD COLUMN     "idempotencyKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "UsoInstrumento_idempotencyKey_key" ON "UsoInstrumento"("idempotencyKey");
