/*
  Warnings:

  - You are about to drop the column `externalId` on the `Customer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[internalId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Customer_externalId_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "externalId",
ADD COLUMN     "internalId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_internalId_key" ON "Customer"("internalId");
