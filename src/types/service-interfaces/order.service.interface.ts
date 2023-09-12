import { WithoutId } from '../common.types';
import { CartView } from '../entities/cart.entity';
import { OrderView } from '../entities/order.entity';

export abstract class OrderServiceInterface {
  abstract getOrders(): Promise<OrderView[]>;
  abstract getOrdersForUser(userId: string): Promise<OrderView[]>;
  abstract getOrderById(id: string): Promise<OrderView>;
  abstract createOrder(cart: WithoutId<CartView>): Promise<OrderView>;
  abstract deleteOrder(id: string): Promise<void>;
}
