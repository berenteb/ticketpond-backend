import { TicketDto } from './ticket.dto';

export class CartDto {
  customerId: string;
  items: CartItemDto[];
}

export class CartItemDto {
  ticket: TicketDto;
}

export class AddToCartDto {
  userId: string;
  ticketId: string;
}

export class RemoveFromCartDto {
  userId: string;
  ticketId: string;
}
