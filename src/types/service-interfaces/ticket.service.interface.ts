import { DeepTicketDto } from '../dtos/deep-ticket.dto';
import { CreateTicketDto, TicketDto, UpdateTicketDto } from '../dtos/ticket.dto';

export abstract class TicketServiceInterface {
  abstract getTickets(): Promise<TicketDto[]>;

  abstract getTicketById(id: string): Promise<DeepTicketDto>;

  abstract getTicketsForExperience(experienceId: string): Promise<TicketDto[]>;

  abstract createTicket(ticket: CreateTicketDto): Promise<TicketDto>;

  abstract updateTicket(id: string, ticket: UpdateTicketDto): Promise<TicketDto>;
  abstract deleteTicket(id: string): Promise<void>;
}
