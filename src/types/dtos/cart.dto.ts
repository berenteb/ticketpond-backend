import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TicketDto } from './ticket.dto';

export class CartDto {
  customerId: string;
  items: CartItemDto[];
}

export class CartItemDto {
  ticket: TicketDto;
}

export class AddToCartDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  ticketId: string;
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class RemoveFromCartDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  ticketId: string;
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
