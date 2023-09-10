import { CartView } from '../entities/cart.entity';

export abstract class CartServiceInterface {
  abstract getCartById(id: string): Promise<CartView>;
  abstract getCartForUser(userId: string): Promise<CartView>;
  abstract createCartForUser(userId: string): Promise<CartView>;
  abstract addItemToCart(cartId: string, ticketId: string, quantity: number): Promise<CartView>;
  abstract removeItemFromCart(cartId: string, ticketId: string, quantity: number): Promise<CartView>;
  abstract deleteCart(cartId: string): Promise<void>;
  abstract deleteCartForUser(userId: string): Promise<void>;
  abstract checkout(cartId: string): Promise<void>;
}
