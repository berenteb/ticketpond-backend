import { CartDto } from '../types/dtos/cart.dto';
import { DeepTicketMock } from './ticket.mock';

export const CartMock: CartDto = {
  id: 'test-cart-id',
  customerId: 'test-customer-id',
  items: [{ id: 'test-cart-item-id', ticketId: 'test-ticket-id', cartId: 'test-cart-id', ticket: DeepTicketMock }],
};
