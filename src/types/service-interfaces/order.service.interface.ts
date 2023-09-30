import { CartDto } from '../dtos/cart.dto';
import { OrderDto } from '../dtos/order.dto';

export abstract class OrderServiceInterface {
  abstract getOrders(): Promise<OrderDto[]>;

  abstract getOrdersForCustomer(userId: string): Promise<OrderDto[]>;

  abstract getOrderById(id: string): Promise<OrderDto>;

  abstract createOrder(cart: CartDto): Promise<OrderDto>;
  abstract deleteOrder(id: string): Promise<void>;
}
