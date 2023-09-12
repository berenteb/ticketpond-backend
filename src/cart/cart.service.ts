import { Injectable } from '@nestjs/common';
import { CartView } from '../types/entities/cart.entity';
import { CartServiceInterface } from '../types/service-interfaces/cart.service.interface';

@Injectable()
export class CartService implements CartServiceInterface {
  addItemToCart(cartId: string, ticketId: string, quantity: number): Promise<CartView> {
    return Promise.resolve(undefined);
  }

  checkout(cartId: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  createCartForUser(userId: string): Promise<CartView> {
    return Promise.resolve(undefined);
  }

  deleteCart(cartId: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  deleteCartForUser(userId: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  getCartById(id: string): Promise<CartView> {
    return Promise.resolve(undefined);
  }

  getCartForUser(userId: string): Promise<CartView> {
    return Promise.resolve(undefined);
  }

  removeItemFromCart(cartId: string, ticketId: string, quantity: number): Promise<CartView> {
    return Promise.resolve(undefined);
  }
}
