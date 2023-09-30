import { ApiProperty } from '@nestjs/swagger';
import { Order, OrderItem } from '@prisma/client';

export class OrderItemDto implements OrderItem {
  @ApiProperty()
  id: string;
  @ApiProperty()
  orderId: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  serialNumber: string;
  @ApiProperty()
  ticketId: string;
}

export class OrderDto implements Order {
  @ApiProperty()
  id: string;
  @ApiProperty()
  customerId: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty({ type: [OrderItemDto] })
  items: OrderItemDto[];
}
