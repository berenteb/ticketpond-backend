import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse } from '@nestjs/swagger';
import { ReqWithUser } from '../types/common.types';
import { DeepTicketDto } from '../types/dtos/deep-ticket.dto';
import { CreateTicketDto, TicketDto, UpdateTicketDto } from '../types/dtos/ticket.dto';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';
import { TicketServiceInterface } from '../types/service-interfaces/ticket.service.interface';

@UseGuards(AuthGuard('jwt'))
@Controller('admin/ticket')
export class TicketAdminController {
  constructor(
    private readonly ticketService: TicketServiceInterface,
    private readonly merchantService: MerchantServiceInterface
  ) {}

  @Get()
  @ApiOkResponse({ type: [DeepTicketDto] })
  async getTickets(): Promise<DeepTicketDto[]> {
    return await this.ticketService.getTickets();
  }

  @Get('me')
  @ApiOkResponse({ type: [DeepTicketDto] })
  async getTicketsForMerchant(@Req() req: ReqWithUser): Promise<DeepTicketDto[]> {
    const merchant = await this.merchantService.getMerchantByUserId(req.user.sub);
    return await this.ticketService.getTicketsForMerchant(merchant.id);
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
