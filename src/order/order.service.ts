import { Injectable } from '@nestjs/common';
import { WithoutId } from '../types/common.types';
import { CartView } from '../types/entities/cart.entity';
import { OrderView } from '../types/entities/order.entity';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';

@Injectable()
export class OrderService implements OrderServiceInterface {
  getOrderById(id: string): Promise<OrderView> {
    return Promise.resolve(undefined);
  }

  getOrders(): Promise<OrderView[]> {
    return Promise.resolve([]);
  }

  getOrdersForUser(userId: string): Promise<OrderView[]> {
    return Promise.resolve([]);
  }

  deleteOrder(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  createOrder(cart: WithoutId<CartView>): Promise<OrderView> {
    return Promise.resolve(undefined);
  }
}
