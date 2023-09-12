import { Identifiable } from '../common.types';

export type TicketEntity = {
  experienceId: string;
  name: string;
  description: string;
  price: number;
  validFrom: number;
  validUntil: number;
} & Identifiable;
