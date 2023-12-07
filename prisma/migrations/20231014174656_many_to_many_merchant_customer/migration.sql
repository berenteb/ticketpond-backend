-- CreateTable
CREATE TABLE "MerchantOnCustomer" (
    "id" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "MerchantOnCustomer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MerchantOnCustomer" ADD CONSTRAINT "MerchantOnCustomer_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchantOnCustomer" ADD CONSTRAINT "MerchantOnCustomer_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
