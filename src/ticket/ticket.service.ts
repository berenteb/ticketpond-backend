import { Injectable } from '@nestjs/common';
import { Ticket } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketDto, UpdateTicketDto } from '../types/dtos/ticket.dto';
import { TicketServiceInterface } from '../types/service-interfaces/ticket.service.interface';

@Injectable()
export class TicketService implements TicketServiceInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async createTicket(ticket: CreateTicketDto): Promise<Ticket> {
    return this.prismaService.ticket.create({ data: ticket });
  }

  async getTicketById(id: string): Promise<Ticket> {
    return this.prismaService.ticket.findUnique({ where: { id } });
  }

  async getTicketForExperience(experienceId: string): Promise<Ticket> {
    return this.prismaService.ticket.findFirst({ where: { experienceId } });
  }

  async getTickets(): Promise<Ticket[]> {
    return this.prismaService.ticket.findMany();
  }

  async updateTicket(id: string, ticket: UpdateTicketDto): Promise<Ticket> {
    return this.prismaService.ticket.update({ where: { id }, data: ticket });
  }

  async deleteTicket(id: string): Promise<void> {
    this.prismaService.ticket.delete({ where: { id } });
  }
}
