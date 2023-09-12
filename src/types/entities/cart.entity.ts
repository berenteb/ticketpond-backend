import { Identifiable } from '../common.types';

export type CartEntity = {
  userId: string | undefined;
} & Identifiable;

export type CartItemEntity = {
  cartId: string;
  ticketId: string;
} & Identifiable;

export type CartView = CartEntity & {
  items: CartItemEntity[];
};
