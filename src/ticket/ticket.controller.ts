import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { WithoutId } from '../types/common.types';
import { TicketEntity } from '../types/entities/ticket.entity';
import { TicketServiceInterface } from '../types/service-interfaces/ticket.service.interface';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketServiceInterface) {}

  @Get()
  async getTickets() {
    return await this.ticketService.getTickets();
  }

  @Get(':id')
  async getTicketById(@Param('id') id: string) {
    return await this.ticketService.getTicketById(id);
  }

  @Get('experience/:id')
  async getTicketForExperience(@Param('id') experienceId: string) {
    return await this.ticketService.getTicketForExperience(experienceId);
  }

  @Post()
  async createTicket(@Body() ticket: WithoutId<TicketEntity>) {
    return await this.ticketService.createTicket(ticket);
  }

  @Patch(':id')
  async updateTicket(@Param('id') id: string, @Body() ticket: WithoutId<TicketEntity>) {
    return await this.ticketService.updateTicket(id, ticket);
  }

  @Delete(':id')
  async deleteTicket(@Param('id') id: string) {
    return await this.ticketService.deleteTicket(id);
  }
}
