import { CartDto } from '../dtos/cart.dto';
import { DeepOrderDto, DeepOrderWithCustomerDto, OrderDto, OrderWithCustomerDto } from '../dtos/order.dto';

export abstract class OrderServiceInterface {
  abstract getOrders(): Promise<OrderWithCustomerDto[]>;
  abstract getOrderByIdWithCustomer(id: string): Promise<DeepOrderWithCustomerDto>;
  abstract getOrdersForMerchant(merchantId: string): Promise<OrderWithCustomerDto[]>;
  abstract getOrdersForCustomer(userId: string): Promise<OrderDto[]>;
  abstract getOrderById(id: string): Promise<DeepOrderDto>;

  abstract createOrder(cart: CartDto): Promise<DeepOrderDto>;
  abstract deleteOrder(id: string): Promise<void>;
}
