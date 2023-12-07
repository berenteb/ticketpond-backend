/*
  Warnings:

  - A unique constraint covering the columns `[serialNumber]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[serialNumber]` on the table `OrderItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `serialNumber` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "serialNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_serialNumber_key" ON "Order"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "OrderItem_serialNumber_key" ON "OrderItem"("serialNumber");
