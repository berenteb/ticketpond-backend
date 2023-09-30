import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartDto } from '../types/dtos/cart.dto';
import { CartServiceInterface } from '../types/service-interfaces/cart.service.interface';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';

@Injectable()
export class CartService implements CartServiceInterface {
  constructor(private readonly prismaService: PrismaService, private readonly orderService: OrderServiceInterface) {}

  async createCartForCustomer(customerId: string): Promise<CartDto> {
    const cart = await this.prismaService.cart.create({
      data: { customerId },
      include: { items: { include: { ticket: { include: { experience: true } } } } },
    });
    Logger.debug(`Created cart for customer ${customerId} with id ${cart.id}`);
    return cart;
  }

  async getCartById(id: string): Promise<CartDto> {
    const cart = await this.prismaService.cart.findUnique({
      where: { id },
      include: { items: { include: { ticket: { include: { experience: true } } } } },
    });
    if (!cart) {
      throw new NotFoundException(`Cart with id ${id} not found`);
    }
    Logger.debug(`Found cart with id ${id}`);
    return cart;
  }

  async getCartForCustomer(customerId: string): Promise<CartDto> {
    const cart = await this.prismaService.cart.findUnique({
      where: { customerId },
      include: { items: { include: { ticket: { include: { experience: true } } } } },
    });
    if (cart) {
      Logger.debug(`Found cart for customer ${customerId}`);
      return cart;
    } else {
      const created = await this.createCartForCustomer(customerId);
      Logger.debug(`Created cart for customer ${customerId} with id ${created.id}`);
      return created;
    }
  }

  async addItemToCart(cartId: string, ticketId: string, quantity: number): Promise<CartDto> {
    for (let i = 0; i < quantity; i++) {
      await this.prismaService.cartItem.create({ data: { cartId, ticketId } });
    }
    Logger.debug(`Added ${quantity} items of ${ticketId} to cart ${cartId}`);
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
    Logger.debug(`Removed ${quantity} items of ${ticketId} from cart ${cartId}`);
    return this.getCartById(cartId);
  }

  async checkout(customerId: string): Promise<void> {
    const cart = await this.getCartForCustomer(customerId);
    Logger.debug(`Checking out cart ${cart.id} for customer ${customerId}`);
    await this.orderService.createOrder(cart);
  }

  async deleteCart(cartId: string): Promise<void> {
    await this.prismaService.cart.delete({ where: { id: cartId } });
    Logger.debug(`Deleted cart ${cartId}`);
  }

  async deleteCartForCustomer(customerId: string): Promise<void> {
    await this.prismaService.cart.delete({ where: { customerId } });
    Logger.debug(`Deleted cart for customer ${customerId}`);
  }
}
