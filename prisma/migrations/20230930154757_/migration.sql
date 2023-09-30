-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'FAIL', 'SUCCESS');

-- AlterTable
ALTER TABLE "Order"
    ADD COLUMN "payment" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    ADD COLUMN "status"  "OrderStatus"   NOT NULL DEFAULT 'PENDING';
