import { Injectable } from '@nestjs/common';
import { WithoutId } from '../types/common.types';
import { TicketEntity } from '../types/entities/ticket.entity';
import { TicketServiceInterface } from '../types/service-interfaces/ticket.service.interface';

@Injectable()
export class TicketService implements TicketServiceInterface {
  createTicket(ticket: WithoutId<TicketEntity>): Promise<TicketEntity> {
    return Promise.resolve(undefined);
  }

  deleteTicket(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  getTicketById(id: string): Promise<TicketEntity> {
    return Promise.resolve(undefined);
  }

  getTicketForExperience(experienceId: string): Promise<TicketEntity> {
    return Promise.resolve(undefined);
  }

  getTickets(): Promise<TicketEntity[]> {
    return Promise.resolve([]);
  }

  updateTicket(id: string, ticket: WithoutId<TicketEntity>): Promise<TicketEntity> {
    return Promise.resolve(undefined);
  }
}
