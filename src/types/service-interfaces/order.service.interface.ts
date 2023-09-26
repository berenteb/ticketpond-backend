import { CartDto } from '../dtos/cart.dto';
import { OrderView } from '../entities/order.entity';

export abstract class OrderServiceInterface {
  abstract getOrders(): Promise<OrderView[]>;
  abstract getOrdersForUser(userId: string): Promise<OrderView[]>;
  abstract getOrderById(id: string): Promise<OrderView>;

  abstract createOrder(cart: CartDto): Promise<OrderView>;
  abstract deleteOrder(id: string): Promise<void>;
}
