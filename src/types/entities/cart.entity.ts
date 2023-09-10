import { Identifiable } from '../common.types';
import { ExperienceEntity } from './experience.entity';
import { TicketEntity } from './ticket.entity';

export type CartEntity = {
  userId: string | undefined;
} & Identifiable;

export type CartItemEntity = {
  cartId: string;
  ticketId: string;
  quantity: number;
} & Identifiable;

export type CartView = CartEntity & {
  items: CartViewItem[];
};

type CartViewItem = {
  experience: ExperienceEntity;
  tickets: (CartItemEntity & TicketEntity)[];
};
