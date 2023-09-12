import { Injectable, Logger } from '@nestjs/common';
import { CartItemEntity, CartView } from '../types/entities/cart.entity';
import { CartServiceInterface } from '../types/service-interfaces/cart.service.interface';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';

@Injectable()
export class InMemoryCartService implements CartServiceInterface {
  private carts: CartView[] = [];
  private idCounter = 0;

  constructor(private readonly orderService: OrderServiceInterface) {}

  async checkout(cartId: string): Promise<void> {
    const cart = this.carts.find((cart) => cart.id === cartId);
    await this.orderService.createOrder(cart);
    cart.items = [];
    Logger.debug(`Checked out cart with id: ${cartId}`, InMemoryCartService.name);
    return Promise.resolve();
  }

  createCartForUser(userId: string): Promise<CartView> {
    const cart: CartView = {
      id: String(this.idCounter++),
      userId,
      items: [],
    };
    this.carts.push(cart);
    Logger.debug(`Created cart: ${cart}`, InMemoryCartService.name);
    return Promise.resolve(cart);
  }

  deleteCart(cartId: string): Promise<void> {
    this.carts = this.carts.filter((cart) => cart.id !== cartId);
    Logger.debug(`Deleted cart with id: ${cartId}`, InMemoryCartService.name);
    return Promise.resolve(undefined);
  }

  deleteCartForUser(userId: string): Promise<void> {
    this.carts = this.carts.filter((cart) => cart.userId !== userId);
    Logger.debug(`Deleted cart with userId: ${userId}`, InMemoryCartService.name);
    return Promise.resolve(undefined);
  }

  getCartById(id: string): Promise<CartView> {
    const cart = this.carts.find((cart) => cart.id === id);
    return Promise.resolve(cart);
  }

  async getCartForUser(userId: string): Promise<CartView> {
    const cart = this.carts.find((cart) => cart.userId === userId);
    if (!cart) return await this.createCartForUser(userId);
    return cart;
  }

  async removeItemFromCart(cartId: string, ticketId: string, quantity: number): Promise<CartView> {
    const cart = await this.getCartById(cartId);

    for (let i = 0; i < quantity; i++) {
      const ticketToRemove = cart.items.find((item) => item.ticketId === ticketId);
      if (!ticketToRemove) break;
      cart.items.filter((item) => item.ticketId !== ticketToRemove.ticketId);
      Logger.debug(`Removed cart item: ${ticketToRemove}`, InMemoryCartService.name);
    }

    return Promise.resolve(cart);
  }

  async addItemToCart(cartId: string, ticketId: string, quantity: number): Promise<CartView> {
    const cart = await this.getCartById(cartId);

    for (let i = 0; i < quantity; i++) {
      const item: CartItemEntity = {
        id: String(this.idCounter++),
        cartId,
        ticketId,
      };
      cart.items.push(item);
      Logger.debug(`Added cart item: ${item}`, InMemoryCartService.name);
    }
    return Promise.resolve(cart);
  }
}
