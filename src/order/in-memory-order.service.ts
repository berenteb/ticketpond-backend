import { Injectable } from '@nestjs/common';
import { WithoutId } from '../types/common.types';
import { OrderView } from '../types/entities/order.entity';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';

@Injectable()
export class OrderService implements OrderServiceInterface {
  private orders: OrderView[] = [];
  private idCounter = 0;

  getOrderById(id: string): Promise<OrderView> {
    const order = this.orders.find((order) => order.id === id);
    return Promise.resolve(order);
  }

  getOrders(): Promise<OrderView[]> {
    return Promise.resolve(this.orders);
  }

  getOrdersForUser(userId: string): Promise<OrderView[]> {
    const orders = this.orders.filter((order) => order.userId === userId);
    return Promise.resolve(orders);
  }

  createOrder(order: WithoutId<OrderView>): Promise<OrderView> {
    const newOrder = {
      ...order,
      id: String(this.idCounter++),
    };
    this.orders.push(newOrder);
    return Promise.resolve(newOrder);
  }

  deleteOrder(id: string): Promise<void> {
    this.orders = this.orders.filter((order) => order.id !== id);
    return Promise.resolve(undefined);
  }
}
