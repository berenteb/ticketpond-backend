import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { DeepTicketDto } from '../types/dtos/deep-ticket.dto';
import { TicketDto } from '../types/dtos/ticket.dto';
import { TicketServiceInterface } from '../types/service-interfaces/ticket.service.interface';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketServiceInterface) {}

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
}
