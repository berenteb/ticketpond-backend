import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse } from '@nestjs/swagger';
import { PermissionGuard } from '../authz/admin.guard';
import { DeepTicketDto } from '../types/dtos/deep-ticket.dto';
import { TicketDto, UpdateTicketDto } from '../types/dtos/ticket.dto';
import { Permissions } from '../types/jwt.types';
import { TicketServiceInterface } from '../types/service-interfaces/ticket.service.interface';

@UseGuards(AuthGuard('jwt'))
@UseGuards(PermissionGuard(Permissions.ADMIN))
@Controller('admin/ticket')
export class TicketAdminController {
  constructor(private readonly ticketService: TicketServiceInterface) {}

  @Get()
  @ApiOkResponse({ type: [DeepTicketDto] })
  async getTickets(): Promise<DeepTicketDto[]> {
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
