import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto, DeepTicketDto, TicketDto, UpdateTicketDto } from '../types/dtos/ticket.dto';
import { TicketServiceInterface } from '../types/service-interfaces/ticket.service.interface';

@Injectable()
export class TicketService implements TicketServiceInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async createTicket(ticket: CreateTicketDto): Promise<TicketDto> {
    const created = await this.prismaService.ticket.create({ data: ticket });
    Logger.debug(`Created ticket with id ${created.id}`, TicketService.name);
    return created;
  }

  async getTicketById(id: string): Promise<DeepTicketDto> {
    const ticket = await this.prismaService.ticket.findUnique({ where: { id }, include: { experience: true } });
    if (!ticket) {
      throw new NotFoundException(`Ticket with id ${id} not found`);
    }
    Logger.debug(`Found ticket with id ${id}`, TicketService.name);
    return ticket;
  }

  async getTicketsForExperience(experienceId: string): Promise<TicketDto[]> {
    const tickets = await this.prismaService.ticket.findMany({ where: { experienceId } });
    Logger.debug(`Found ${tickets.length} tickets for experience ${experienceId}`, TicketService.name);
    return tickets;
  }

  async getTickets(): Promise<TicketDto[]> {
    const tickets = await this.prismaService.ticket.findMany();
    Logger.debug(`Found ${tickets.length} tickets`, TicketService.name);
    return tickets;
  }

  async updateTicket(id: string, ticket: UpdateTicketDto): Promise<TicketDto> {
    const updated = await this.prismaService.ticket.update({ where: { id }, data: ticket });
    Logger.debug(`Updated ticket with id ${id}`, TicketService.name);
    return updated;
  }

  async deleteTicket(id: string): Promise<void> {
    await this.prismaService.ticket.delete({ where: { id } });
    Logger.debug(`Deleted ticket with id ${id}`, TicketService.name);
  }
}
