import { Injectable } from '@nestjs/common';
import { WithoutId } from '../types/common.types';
import { TicketEntity } from '../types/entities/ticket.entity';
import { TicketServiceInterface } from '../types/service-interfaces/ticket.service.interface';

@Injectable()
export class InMemoryTicketService implements TicketServiceInterface {
  private tickets: TicketEntity[] = [];
  private idCounter = 0;

  createTicket(ticket: WithoutId<TicketEntity>): Promise<TicketEntity> {
    const newTicket = {
      ...ticket,
      id: String(this.idCounter++),
    };
    this.tickets.push(newTicket);
    return Promise.resolve(newTicket);
  }

  deleteTicket(id: string): Promise<void> {
    this.tickets = this.tickets.filter((t) => t.id !== id);
    return Promise.resolve();
  }

  getTicketById(id: string): Promise<TicketEntity> {
    return Promise.resolve(this.tickets.find((t) => t.id === id));
  }

  getTicketForExperience(experienceId: string): Promise<TicketEntity> {
    return Promise.resolve(this.tickets.find((t) => t.experienceId === experienceId));
  }

  getTickets(): Promise<TicketEntity[]> {
    return Promise.resolve(this.tickets);
  }

  updateTicket(id: string, ticket: WithoutId<TicketEntity>): Promise<TicketEntity> {
    const index = this.tickets.findIndex((t) => t.id === id);
    const updatedTicket: TicketEntity = {
      ...ticket,
      id,
    };
    this.tickets[index] = updatedTicket;
    return Promise.resolve(updatedTicket);
  }
}
