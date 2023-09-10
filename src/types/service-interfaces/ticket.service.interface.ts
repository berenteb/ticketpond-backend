import { WithoutId } from '../common.types';
import { TicketEntity } from '../entities/ticket.entity';

export abstract class TicketServiceInterface {
  abstract getTickets(): Promise<TicketEntity[]>;
  abstract getTicketById(id: string): Promise<TicketEntity>;
  abstract createTicket(ticket: WithoutId<TicketEntity>): Promise<TicketEntity>;
  abstract updateTicket(id: string, ticket: WithoutId<TicketEntity>): Promise<TicketEntity>;
  abstract deleteTicket(id: string): Promise<void>;
}
