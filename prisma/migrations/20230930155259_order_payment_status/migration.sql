/*
  Warnings:

  - You are about to drop the column `payment` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order"
    DROP COLUMN "payment",
    DROP COLUMN "status",
    ADD COLUMN "orderStatus"   "OrderStatus"   NOT NULL DEFAULT 'PENDING',
    ADD COLUMN "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID';
