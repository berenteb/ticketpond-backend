import { DeepOrderDto } from '../types/dtos/order.dto';
import { DeepTicketMock } from './ticket.mock';

export const OrderMock: DeepOrderDto = {
  id: 'test-order-id',
  customerId: 'test-customer-id',
  serialNumber: 'test-serial-number',
  items: [
    {
      id: 'test-order-item-id',
      orderId: 'test-order-id',
      ticketId: 'test-ticket-id',
      price: 100,
      ticket: DeepTicketMock,
      serialNumber: 'test-serial-number',
    },
  ],
  createdAt: new Date(),
  paymentStatus: 'SUCCESS',
  orderStatus: 'PAID',
};
