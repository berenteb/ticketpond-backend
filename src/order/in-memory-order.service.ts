import { Injectable, Logger } from '@nestjs/common';
import { WithoutId } from '../types/common.types';
import { CartView } from '../types/entities/cart.entity';
import { OrderStatus, OrderView, PaymentStatus } from '../types/entities/order.entity';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';
import { generateSerialNumber } from '../util/serialNumber.util';

let orders: OrderView[] = [];

@Injectable()
export class InMemoryOrderService implements OrderServiceInterface {
  private idCounter = 0;

  async getOrderById(id: string): Promise<OrderView> {
    return orders.find((order) => order.id === id);
  }

  async getOrders(): Promise<OrderView[]> {
    return orders;
  }

  async getOrdersForUser(userId: string): Promise<OrderView[]> {
    return orders.filter((order) => order.userId === userId);
  }

  async createOrder(cart: WithoutId<CartView>): Promise<OrderView> {
    const newOrder = mapCartToOrder(cart, String(this.idCounter++));
    orders.push(newOrder);
    Logger.debug(`Created order: ${JSON.stringify(newOrder)}`, InMemoryOrderService.name);
    return newOrder;
  }

  async deleteOrder(id: string): Promise<void> {
    orders = orders.filter((order) => order.id !== id);
    Logger.debug(`Deleted order with id: ${id}`, InMemoryOrderService.name);
  }
}

function mapCartToOrder(cart: WithoutId<CartView>, id: string): OrderView {
  return {
    id,
    userId: cart.userId,
    createdAt: new Date(),
    paymentStatus: PaymentStatus.PENDING,
    orderStatus: OrderStatus.PENDING,
    items: cart.items.map((item) => ({ orderId: id, ticketId: item.ticketId, serialNumber: generateSerialNumber() })),
  };
}
