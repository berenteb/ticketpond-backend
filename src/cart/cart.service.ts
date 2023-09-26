import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartDto } from '../types/dtos/cart.dto';
import { CartServiceInterface } from '../types/service-interfaces/cart.service.interface';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';

@Injectable()
export class CartService implements CartServiceInterface {
  constructor(private readonly prismaService: PrismaService, private readonly orderService: OrderServiceInterface) {}

  async createCartForCustomer(customerId: string): Promise<CartDto> {
    return this.prismaService.cart.create({
      data: { customerId },
      include: { items: { include: { ticket: { include: { experience: true } } } } },
    });
  }

  async getCartById(id: string): Promise<CartDto> {
    return this.prismaService.cart.findUnique({
      where: { id },
      include: { items: { include: { ticket: { include: { experience: true } } } } },
    });
  }

  async getCartForCustomer(customerId: string): Promise<CartDto> {
    return this.prismaService.cart.findUnique({
      where: { customerId },
      include: { items: { include: { ticket: { include: { experience: true } } } } },
    });
  }

  async addItemToCart(cartId: string, ticketId: string, quantity: number): Promise<CartDto> {
    for (let i = 0; i < quantity; i++) {
      await this.prismaService.cartItem.create({ data: { cartId, ticketId } });
    }
    return this.getCartById(cartId);
  }

  async removeItemFromCart(cartId: string, ticketId: string, quantity: number): Promise<CartDto> {
    for (let i = 0; i < quantity; i++) {
      const deleteCandidate = await this.prismaService.cartItem.findFirst({ where: { cartId, ticketId } });
      if (!deleteCandidate) {
        break;
      }
      await this.prismaService.cartItem.delete({ where: { id: deleteCandidate.id } });
    }
    return this.getCartById(cartId);
  }

  async checkout(customerId: string): Promise<void> {
    const cart = await this.getCartForCustomer(customerId);
    await this.orderService.createOrder(cart);
  }

  async deleteCart(cartId: string): Promise<void> {
    this.prismaService.cart.delete({ where: { id: cartId } });
  }

  async deleteCartForCustomer(customerId: string): Promise<void> {
    this.prismaService.cart.delete({ where: { customerId } });
  }
}
