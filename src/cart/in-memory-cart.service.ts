import { Injectable } from '@nestjs/common';
import { CartView } from '../types/entities/cart.entity';
import { CartServiceInterface } from '../types/service-interfaces/cart.service.interface';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';

@Injectable()
export class CartService implements CartServiceInterface {
  private carts: CartView[] = [];
  private idCounter = 0;

  constructor(private readonly orderService: OrderServiceInterface) {}

  async checkout(cartId: string): Promise<void> {
    const cart = this.carts.find((cart) => cart.id === cartId);
    await this.orderService.createOrder(cart);
    cart.items = [];
    return Promise.resolve();
  }

  createCartForUser(userId: string): Promise<CartView> {
    const cart: CartView = {
      id: String(this.idCounter++),
      userId,
      items: [],
    };
    this.carts.push(cart);
    return Promise.resolve(cart);
  }

  deleteCart(cartId: string): Promise<void> {
    this.carts = this.carts.filter((cart) => cart.id !== cartId);
    return Promise.resolve(undefined);
  }

  deleteCartForUser(userId: string): Promise<void> {
    this.carts = this.carts.filter((cart) => cart.userId !== userId);
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
    }

    return Promise.resolve(cart);
  }

  async addItemToCart(cartId: string, ticketId: string, quantity: number): Promise<CartView> {
    const cart = await this.getCartById(cartId);

    for (let i = 0; i < quantity; i++) {
      cart.items.push({
        id: String(this.idCounter++),
        cartId,
        ticketId,
      });
    }
    return Promise.resolve(cart);
  }
}
