import { DeepOrderDto } from '../types/dtos/order.dto';

export const OrderMock: DeepOrderDto = {
  id: 'test-order-id',
  customerId: 'test-customer-id',
  serialNumber: 'test-serial-number',
  items: [],
  createdAt: new Date(),
  paymentStatus: 'SUCCESS',
  orderStatus: 'PAID',
};
