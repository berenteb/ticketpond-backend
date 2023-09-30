import { ApiProperty } from '@nestjs/swagger';
import { Order, OrderItem } from '@prisma/client';

export class OrderItemDto implements OrderItem {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  orderId: string;
  @ApiProperty({ example: 123.0 })
  price: number;
  @ApiProperty({ example: 'TP-123456' })
  serialNumber: string;
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  ticketId: string;
}

export class OrderDto implements Order {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  customerId: string;
  @ApiProperty({ example: '2021-06-01T00:00:00.000Z' })
  createdAt: Date;
  @ApiProperty({ type: [OrderItemDto] })
  items: OrderItemDto[];
}
