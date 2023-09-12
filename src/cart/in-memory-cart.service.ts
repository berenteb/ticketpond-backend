import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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
    await this.orderService.createOrder(JSON.parse(JSON.stringify(cart)));
    cart.items = [];
    Logger.debug(`Checked out cart with id: ${cartId}`, InMemoryCartService.name);
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
    if (!cart) throw new NotFoundException(`Cart with id ${id} not found`);

    return Promise.resolve(cart);
  }

  async getCartForUser(userId: string): Promise<CartView> {
    const cart = this.carts.find((cart) => cart.userId === userId);
    if (!cart) return await this.createCartForUser(userId);
    return cart;
  }

  async removeItemFromCart(cartId: string, ticketId: string, quantity: number): Promise<CartView> {
    const cart = await this.getCartById(cartId);
    if (!cart) throw new NotFoundException(`Cart with id ${cartId} not found`);

    const ticketsToRemove = cart.items.filter((item) => item.ticketId === ticketId).splice(0, quantity);
    cart.items = cart.items.filter((item) => !ticketsToRemove.includes(item));

    Logger.debug(`Removed ${quantity} cart item(s)`, InMemoryCartService.name);

    return Promise.resolve(cart);
  }

  async addItemToCart(cartId: string, ticketId: string, quantity: number): Promise<CartView> {
    const cart = await this.getCartById(cartId);
    if (!cart) throw new NotFoundException(`Cart with id ${cartId} not found`);

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
