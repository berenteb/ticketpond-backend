-- DropForeignKey
ALTER TABLE "Cart"
    DROP CONSTRAINT "Cart_customerId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem"
    DROP CONSTRAINT "CartItem_cartId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem"
    DROP CONSTRAINT "CartItem_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "Order"
    DROP CONSTRAINT "Order_customerId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem"
    DROP CONSTRAINT "OrderItem_orderId_fkey";

-- AddForeignKey
ALTER TABLE "Cart"
    ADD CONSTRAINT "Cart_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem"
    ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem"
    ADD CONSTRAINT "CartItem_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order"
    ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem"
    ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
