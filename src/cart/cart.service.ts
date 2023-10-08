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
    Logger.debug(`Created cart for customer ${customerId} with id ${cart.id}`, CartService.name);
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
    Logger.debug(`Found cart with id ${id}`, CartService.name);
    return cart;
  }

  async getCartForCustomer(customerId: string): Promise<CartDto> {
    const cart = await this.prismaService.cart.findUnique({
      where: { customerId },
      include: { items: { include: { ticket: { include: { experience: true } } } } },
    });
    if (cart) {
      Logger.debug(`Found cart for customer ${customerId}`, CartService.name);
      return cart;
    } else {
      const created = await this.createCartForCustomer(customerId);
      Logger.debug(`Created cart for customer ${customerId} with id ${created.id}`, CartService.name);
      return created;
    }
  }

  async addItemToCartForCustomer(customerId: string, ticketId: string, quantity: number): Promise<CartDto> {
    const cart = await this.getCartForCustomer(customerId);
    return this.addItemToCart(cart.id, ticketId, quantity);
  }

  async addItemToCart(cartId: string, ticketId: string, quantity: number): Promise<CartDto> {
    for (let i = 0; i < quantity; i++) {
      await this.prismaService.cartItem.create({ data: { cartId, ticketId } });
    }
    Logger.debug(`Added ${quantity} items of ${ticketId} to cart ${cartId}`, CartService.name);
    return this.getCartById(cartId);
  }

  async removeItemFromCartForCustomer(customerId: string, ticketId: string, quantity: number): Promise<CartDto> {
    const cart = await this.getCartForCustomer(customerId);
    return this.removeItemFromCart(cart.id, ticketId, quantity);
  }

  async removeItemFromCart(cartId: string, ticketId: string, quantity: number): Promise<CartDto> {
    for (let i = 0; i < quantity; i++) {
      const deleteCandidate = await this.prismaService.cartItem.findFirst({ where: { cartId, ticketId } });
      if (!deleteCandidate) {
        break;
      }
      await this.prismaService.cartItem.delete({ where: { id: deleteCandidate.id } });
    }
    Logger.debug(`Removed ${quantity} items of ${ticketId} from cart ${cartId}`, CartService.name);
    return this.getCartById(cartId);
  }

  async checkout(cartId: string): Promise<string> {
    const cart = await this.getCartById(cartId);
    Logger.debug(`Checking out cart ${cartId}`, CartService.name);
    const order = await this.orderService.createOrder(cart);
    await this.deleteCart(cartId);
    Logger.debug(`Checked out cart ${cartId} to order ${order.id}`, CartService.name);
    return order.id;
  }

  async deleteCart(cartId: string): Promise<void> {
    await this.prismaService.cart.delete({ where: { id: cartId } });
    Logger.debug(`Deleted cart ${cartId}`, CartService.name);
  }

  async deleteCartForCustomer(customerId: string): Promise<void> {
    await this.prismaService.cart.delete({ where: { customerId } });
    Logger.debug(`Deleted cart for customer ${customerId}`, CartService.name);
  }
}
