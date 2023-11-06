import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { OrderStatus, PaymentStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CartDto } from '../types/dtos/cart.dto';
import { DeepOrderDto, DeepOrderWithCustomerDto, OrderDto, OrderWithCustomerDto } from '../types/dtos/order.dto';
import { NotificationServiceInterface } from '../types/service-interfaces/notification.service.interface';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';
import { PassServiceInterface } from '../types/service-interfaces/pass.service.interface';
import { generateDateBasedSerialNumber, generateSerialNumber } from '../util/generators.util';

@Injectable()
export class OrderService implements OrderServiceInterface {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passService: PassServiceInterface,
    private readonly notificationService: NotificationServiceInterface
  ) {}

  async getOrderById(id: string): Promise<DeepOrderDto> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: { include: { ticket: { include: { experience: true } } } } },
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    Logger.debug(`Found order with id ${id}`, OrderService.name);
    return order;
  }

  async getOrders(): Promise<DeepOrderWithCustomerDto[]> {
    const orders = await this.prisma.order.findMany({
      include: { items: { include: { ticket: { include: { experience: true } } } }, customer: true },
    });
    Logger.debug(`Found ${orders.length} orders`, OrderService.name);
    return orders;
  }

  async getOrdersForCustomer(customerId: string): Promise<OrderDto[]> {
    const order = await this.prisma.order.findMany({
      where: { customerId },
      include: { items: true },
    });
    Logger.debug(`Found ${order.length} orders for customer with id ${customerId}`, OrderService.name);
    return order;
  }

  async deleteOrder(id: string): Promise<void> {
    await this.prisma.order.delete({ where: { id } });
    await this.prisma.orderItem.deleteMany({ where: { orderId: id } });
    Logger.debug(`Deleted order with id ${id}`, OrderService.name);
  }

  async createOrder(cart: CartDto): Promise<DeepOrderDto> {
    const { customerId, items } = cart;
    const sum = items.reduce((acc, item) => acc + item.ticket.price, 0);
    const defaultStatus = sum === 0 ? { orderStatus: OrderStatus.PAID, paymentStatus: PaymentStatus.SUCCESS } : {};
    const created = await this.prisma.order.create({
      data: {
        customerId,
        serialNumber: generateDateBasedSerialNumber(),
        ...defaultStatus,
        items: {
          create: items.map((item) => ({
            ticketId: item.ticket.id,
            price: item.ticket.price,
            serialNumber: generateSerialNumber(),
          })),
        },
      },
      include: { items: { include: { ticket: { include: { experience: true } } } } },
    });
    Logger.debug(`Created order with id ${created.id}`, OrderService.name);
    return created;
  }

  async getOrderByIdWithCustomer(id: string): Promise<DeepOrderWithCustomerDto> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: { include: { ticket: { include: { experience: true } } } }, customer: true },
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    Logger.debug(`Found order with id ${id}`, OrderService.name);
    return order;
  }

  async getOrdersForMerchant(merchantId: string): Promise<OrderWithCustomerDto[]> {
    const orders = await this.prisma.order.findMany({
      where: { items: { some: { ticket: { experience: { merchantId } } } } },
      include: { items: true, customer: true },
    });
    Logger.debug(`Found ${orders.length} orders for merchant with id ${merchantId}`, OrderService.name);
    return orders;
  }

  async isOwnProperty(itemId: string, ownerId: string): Promise<boolean> {
    const order = await this.prisma.order.findFirst({
      where: { id: itemId, customerId: ownerId },
    });
    return !!order;
  }

  async isConnectedToMerchant(itemId: string, merchantId: string): Promise<boolean> {
    const order = await this.prisma.order.findFirst({
      where: { id: itemId, items: { some: { ticket: { experience: { merchantId } } } } },
    });
    return !!order;
  }

  async fulfillOrder(id: string): Promise<void> {
    const order = await this.prisma.order.update({
      where: { id },
      data: { orderStatus: OrderStatus.PAID, paymentStatus: PaymentStatus.SUCCESS },
      include: { items: { include: { ticket: { include: { experience: true } } } }, customer: true },
    });
    await this.passService.generatePasses(order);
    this.notificationService.sendOrderSuccess(order);
    Logger.debug(`Fulfilled order with id ${id}`, OrderService.name);
  }

  async failOrder(id: string): Promise<void> {
    await this.prisma.order.update({
      where: { id },
      data: { paymentStatus: PaymentStatus.FAIL },
    });
    Logger.debug(`Failed order with id ${id}`, OrderService.name);
  }

  async cancelOrder(id: string): Promise<void> {
    await this.prisma.order.update({
      where: { id },
      data: { orderStatus: OrderStatus.CANCELLED },
    });
    Logger.debug(`Cancelled order with id ${id}`, OrderService.name);
  }
}
