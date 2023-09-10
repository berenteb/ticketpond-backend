import { OrderView } from '../entities/order.entity';

export abstract class OrderServiceInterface {
  abstract getOrders(): Promise<OrderView[]>;
  abstract getOrdersForUser(userId: string): Promise<OrderView[]>;
  abstract getOrderById(id: string): Promise<OrderView>;
}
