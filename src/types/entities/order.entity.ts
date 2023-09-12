import { Identifiable } from '../common.types';

export type OrderView = OrderEntity & {
  items: OrderItemEntity[];
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
  serialNumber: string;
};

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
