import { Injectable } from '@nestjs/common';
import { WithoutId } from '../types/common.types';
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

  createOrder(order: WithoutId<OrderView>): Promise<OrderView> {
    return Promise.resolve(undefined);
  }

  deleteOrder(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
