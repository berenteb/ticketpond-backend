import { OrderItem } from '@prisma/client';

export class OrderDto {
  id: string;
  createdAt: Date;
  items: OrderItem[];
}
