import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartDto } from '../types/dtos/cart.dto';
import { OrderDto } from '../types/dtos/order.dto';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';
import { generateSerialNumber } from '../util/serialNumber.util';

@Injectable()
export class OrderService implements OrderServiceInterface {
  constructor(private readonly prisma: PrismaService) {}

  async getOrderById(id: string): Promise<OrderDto> {
    return this.prisma.order.findUnique({
      where: { id },
      include: { items: { include: { ticket: { include: { experience: true } } } } },
    });
  }

  async getOrders(): Promise<OrderDto[]> {
    return this.prisma.order.findMany({
      include: { items: { include: { ticket: { include: { experience: true } } } } },
    });
  }

  async getOrdersForCustomer(customerId: string): Promise<OrderDto[]> {
    return this.prisma.order.findMany({
      where: { customerId },
      include: { items: { include: { ticket: { include: { experience: true } } } } },
    });
  }

  async deleteOrder(id: string): Promise<void> {
    this.prisma.order.delete({ where: { id } });
    this.prisma.orderItem.deleteMany({ where: { orderId: id } });
  }

  async createOrder(cart: CartDto): Promise<OrderDto> {
    const { customerId, items } = cart;
    return this.prisma.order.create({
      data: {
        customerId,
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
  }
}
