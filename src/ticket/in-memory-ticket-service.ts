import { Injectable, Logger } from '@nestjs/common';
import { WithoutId } from '../types/common.types';
import { TicketEntity } from '../types/entities/ticket.entity';
import { TicketServiceInterface } from '../types/service-interfaces/ticket.service.interface';

@Injectable()
export class InMemoryTicketService implements TicketServiceInterface {
  private tickets: TicketEntity[] = [];
  private idCounter = 0;

  async createTicket(ticket: WithoutId<TicketEntity>): Promise<TicketEntity> {
    const newTicket = {
      ...ticket,
      id: String(this.idCounter++),
    };
    this.tickets.push(newTicket);
    Logger.log(`Created ticket: ${newTicket}`, InMemoryTicketService.name);
    return newTicket;
  }

  async deleteTicket(id: string): Promise<void> {
    this.tickets = this.tickets.filter((t) => t.id !== id);
    Logger.log(`Deleted ticket with id: ${id}`, InMemoryTicketService.name);
  }

  async getTicketById(id: string): Promise<TicketEntity> {
    return this.tickets.find((t) => t.id === id);
  }

  async getTicketForExperience(experienceId: string): Promise<TicketEntity> {
    return this.tickets.find((t) => t.experienceId === experienceId);
  }

  async getTickets(): Promise<TicketEntity[]> {
    return this.tickets;
  }

  async updateTicket(id: string, ticket: WithoutId<TicketEntity>): Promise<TicketEntity> {
    const index = this.tickets.findIndex((t) => t.id === id);
    const updatedTicket: TicketEntity = {
      ...ticket,
      id,
    };
    this.tickets[index] = updatedTicket;
    Logger.log(`Updated ticket: ${updatedTicket}`, InMemoryTicketService.name);
    return updatedTicket;
  }
}
