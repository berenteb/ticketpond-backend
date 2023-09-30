import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Ticket } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto, UpdateTicketDto } from '../types/dtos/ticket.dto';
import { TicketServiceInterface } from '../types/service-interfaces/ticket.service.interface';

@Injectable()
export class TicketService implements TicketServiceInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async createTicket(ticket: CreateTicketDto): Promise<Ticket> {
    const created = await this.prismaService.ticket.create({ data: ticket });
    Logger.debug(`Created ticket with id ${created.id}`);
    return created;
  }

  async getTicketById(id: string): Promise<Ticket> {
    const ticket = await this.prismaService.ticket.findUnique({ where: { id } });
    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }
    return ticket;
  }

  async getTicketsForExperience(experienceId: string): Promise<Ticket[]> {
    const tickets = await this.prismaService.ticket.findMany({ where: { experienceId } });
    Logger.debug(`Found ${tickets.length} tickets for experience ${experienceId}`);
    return tickets;
  }

  async getTickets(): Promise<Ticket[]> {
    const tickets = await this.prismaService.ticket.findMany();
    Logger.debug(`Found ${tickets.length} tickets`);
    return tickets;
  }

  async updateTicket(id: string, ticket: UpdateTicketDto): Promise<Ticket> {
    const updated = await this.prismaService.ticket.update({ where: { id }, data: ticket });
    Logger.debug(`Updated ticket with id ${id}`);
    return updated;
  }

  async deleteTicket(id: string): Promise<void> {
    await this.prismaService.ticket.delete({ where: { id } });
    Logger.debug(`Deleted ticket with id ${id}`);
  }
}
