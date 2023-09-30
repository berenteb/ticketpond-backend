import { ApiProperty } from '@nestjs/swagger';
import { Cart, CartItem } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TicketDto } from './ticket.dto';

export class CartItemDto implements CartItem {
  @ApiProperty()
  id: string;
  @ApiProperty()
  cartId: string;
  @ApiProperty()
  ticketId: string;
  @ApiProperty()
  ticket: TicketDto;
}

export class CartDto implements Cart {
  @ApiProperty()
  id: string;
  @ApiProperty()
  customerId: string;
  @ApiProperty({ type: [CartItemDto] })
  items: CartItemDto[];
}

export class AddToCartDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ticketId: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class RemoveFromCartDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ticketId: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
