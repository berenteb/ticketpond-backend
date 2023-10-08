import { CartDto } from '../dtos/cart.dto';
import { DeepOrderDto, OrderDto } from '../dtos/order.dto';

export abstract class OrderServiceInterface {
  abstract getOrders(): Promise<OrderDto[]>;

  abstract getOrdersForCustomer(userId: string): Promise<OrderDto[]>;

  abstract getOrderById(id: string): Promise<DeepOrderDto>;

  abstract createOrder(cart: CartDto): Promise<DeepOrderDto>;
  abstract deleteOrder(id: string): Promise<void>;
}
