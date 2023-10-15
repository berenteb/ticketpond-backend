import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartDto } from '../types/dtos/cart.dto';
import { DeepOrderDto, DeepOrderWithCustomerDto, OrderDto, OrderWithCustomerDto } from '../types/dtos/order.dto';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';
import { generateDateBasedSerialNumber, generateSerialNumber } from '../util/serialNumber.util';

@Injectable()
export class OrderService implements OrderServiceInterface {
  constructor(private readonly prisma: PrismaService) {}

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
    const created = await this.prisma.order.create({
      data: {
        customerId,
        serialNumber: generateDateBasedSerialNumber(),
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
}
