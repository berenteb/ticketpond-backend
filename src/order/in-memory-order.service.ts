import { Injectable } from '@nestjs/common';
import { WithoutId } from '../types/common.types';
import { CartView } from '../types/entities/cart.entity';
import { OrderStatus, OrderView, PaymentStatus } from '../types/entities/order.entity';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';
import { generateSerialNumber } from '../util/serialNumber.util';

@Injectable()
export class InMemoryOrderService implements OrderServiceInterface {
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

  createOrder(cart: WithoutId<CartView>): Promise<OrderView> {
    const newOrder = mapCartToOrder(cart, String(this.idCounter++));
    this.orders.push(newOrder);
    return Promise.resolve(newOrder);
  }

  deleteOrder(id: string): Promise<void> {
    this.orders = this.orders.filter((order) => order.id !== id);
    return Promise.resolve(undefined);
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
