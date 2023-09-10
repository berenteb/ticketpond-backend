import { Identifiable } from '../common.types';
import { ExperienceEntity } from './experience.entity';
import { TicketEntity } from './ticket.entity';

export type OrderView = OrderEntity & {
  items: OrderViewItem[];
};

type OrderViewItem = {
  experience: ExperienceEntity;
  tickets: (OrderItemEntity & TicketEntity)[];
};

export type OrderEntity = {
  userId: string;
  createdAt: Date;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
} & Identifiable;

export type OrderItemEntity = {
  orderId: string;
  ticketId: string;
  quantity: number;
} & Identifiable;

export enum PaymentStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAIL = 'fail',
}

export enum OrderStatus {
  PENDING = 'pending',
  UNPAID = 'unpaid',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}
