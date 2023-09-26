import { Ticket } from '@prisma/client';
import { CreateTicketDto, UpdateTicketDto } from '../dtos/ticket.dto';

export abstract class TicketServiceInterface {
  abstract getTickets(): Promise<Ticket[]>;
  abstract getTicketById(id: string): Promise<Ticket>;
  abstract getTicketForExperience(experienceId: string): Promise<Ticket>;
  abstract createTicket(ticket: CreateTicketDto): Promise<Ticket>;
  abstract updateTicket(id: string, ticket: UpdateTicketDto): Promise<Ticket>;
  abstract deleteTicket(id: string): Promise<void>;
}
