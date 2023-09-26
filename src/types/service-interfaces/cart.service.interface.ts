import { CartDto } from '../dtos/cart.dto';

export abstract class CartServiceInterface {
  abstract getCartById(id: string): Promise<CartDto>;

  abstract getCartForCustomer(customerId: string): Promise<CartDto>;

  abstract createCartForCustomer(customerId: string): Promise<CartDto>;

  abstract addItemToCart(cartId: string, ticketId: string, quantity: number): Promise<CartDto>;

  abstract removeItemFromCart(cartId: string, ticketId: string, quantity: number): Promise<CartDto>;
  abstract deleteCart(cartId: string): Promise<void>;

  abstract deleteCartForCustomer(customerId: string): Promise<void>;
  abstract checkout(cartId: string): Promise<void>;
}
