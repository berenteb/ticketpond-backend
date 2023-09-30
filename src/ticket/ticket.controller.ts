import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Ticket } from '@prisma/client';
import { CreateTicketDto, UpdateTicketDto } from '../types/dtos/ticket.dto';
import { TicketServiceInterface } from '../types/service-interfaces/ticket.service.interface';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketServiceInterface) {}

  @Get()
  async getTickets(): Promise<Ticket[]> {
    return await this.ticketService.getTickets();
  }

  @Get(':id')
  async getTicketById(@Param('id') id: string): Promise<Ticket> {
    return await this.ticketService.getTicketById(id);
  }

  @Get('experience/:id')
  async getTicketsForExperience(@Param('id') experienceId: string): Promise<Ticket[]> {
    return await this.ticketService.getTicketsForExperience(experienceId);
  }

  @Post()
  async createTicket(@Body() ticket: CreateTicketDto): Promise<Ticket> {
    return await this.ticketService.createTicket(ticket);
  }

  @Patch(':id')
  async updateTicket(@Param('id') id: string, @Body() ticket: UpdateTicketDto): Promise<Ticket> {
    return await this.ticketService.updateTicket(id, ticket);
  }

  @Delete(':id')
  async deleteTicket(@Param('id') id: string): Promise<void> {
    return await this.ticketService.deleteTicket(id);
  }
}
