import { Merchant } from '@prisma/client';

export const MerchantMock: Merchant = {
  id: 'test-merchant-id',
  name: 'test-merchant-name',
  description: 'test-merchant-description',
  address: 'test-merchant-address',
  email: 'test-merchant-email',
  phone: 'test-merchant-phone-number',
};
