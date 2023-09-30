import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateTicketDto, DeepTicketDto, TicketDto, UpdateTicketDto } from '../types/dtos/ticket.dto';
import { TicketServiceInterface } from '../types/service-interfaces/ticket.service.interface';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketServiceInterface) {}

  @Get()
  @ApiOkResponse({ type: [TicketDto] })
  async getTickets(): Promise<TicketDto[]> {
    return await this.ticketService.getTickets();
  }

  @Get(':id')
  @ApiOkResponse({ type: DeepTicketDto })
  async getTicketById(@Param('id') id: string): Promise<DeepTicketDto> {
    return await this.ticketService.getTicketById(id);
  }

  @Get('experience/:id')
  @ApiOkResponse({ type: [TicketDto] })
  async getTicketsForExperience(@Param('id') experienceId: string): Promise<TicketDto[]> {
    return await this.ticketService.getTicketsForExperience(experienceId);
  }

  @Post()
  @ApiOkResponse({ type: TicketDto })
  async createTicket(@Body() ticket: CreateTicketDto): Promise<TicketDto> {
    return await this.ticketService.createTicket(ticket);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TicketDto })
  async updateTicket(@Param('id') id: string, @Body() ticket: UpdateTicketDto): Promise<TicketDto> {
    return await this.ticketService.updateTicket(id, ticket);
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteTicket(@Param('id') id: string): Promise<void> {
    return await this.ticketService.deleteTicket(id);
  }
}
