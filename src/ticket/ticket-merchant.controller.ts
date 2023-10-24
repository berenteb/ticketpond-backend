import { Body, Controller, Get, Param, Patch, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse } from '@nestjs/swagger';
import { PermissionGuard } from '../authz/admin.guard';
import { ReqWithUser } from '../types/common.types';
import { DeepTicketDto } from '../types/dtos/deep-ticket.dto';
import { CreateTicketDto, TicketDto, UpdateTicketDto } from '../types/dtos/ticket.dto';
import { Permissions } from '../types/jwt.types';
import { ExperienceServiceInterface } from '../types/service-interfaces/experience.service.interface';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';
import { TicketServiceInterface } from '../types/service-interfaces/ticket.service.interface';

@UseGuards(AuthGuard('jwt'))
@UseGuards(PermissionGuard(Permissions.MERCHANT))
@Controller('merchant/ticket')
export class TicketMerchantController {
  constructor(
    private readonly ticketService: TicketServiceInterface,
    private readonly experienceService: ExperienceServiceInterface,
    private readonly merchantService: MerchantServiceInterface
  ) {}

  @Get()
  @ApiOkResponse({ type: [DeepTicketDto] })
  async getTickets(@Req() req: ReqWithUser): Promise<DeepTicketDto[]> {
    const merchant = await this.merchantService.getMerchantByUserId(req.user.sub);
    return await this.ticketService.getTicketsForMerchant(merchant.id);
  }

  @Get(':id')
  @ApiOkResponse({ type: DeepTicketDto })
  async getTicketById(@Param('id') id: string, @Req() req: ReqWithUser): Promise<DeepTicketDto> {
    const merchant = await this.merchantService.getMerchantByUserId(req.user.sub);
    if (!(await this.ticketService.isOwnProperty(id, merchant.id))) throw new UnauthorizedException();
    return await this.ticketService.getTicketById(id);
  }

  @Get('experience/:id')
  @ApiOkResponse({ type: [TicketDto] })
  async getTicketsForExperience(@Param('id') id: string, @Req() req: ReqWithUser): Promise<TicketDto[]> {
    const merchant = await this.merchantService.getMerchantByUserId(req.user.sub);
    if (!(await this.experienceService.isOwnProperty(id, merchant.id))) throw new UnauthorizedException();
    return await this.ticketService.getTicketsForExperience(id);
  }

  @Post()
  @ApiOkResponse({ type: TicketDto })
  async createTicket(@Body() ticket: CreateTicketDto): Promise<TicketDto> {
    return await this.ticketService.createTicket(ticket);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TicketDto })
  async updateTicket(
    @Param('id') id: string,
    @Body() ticket: UpdateTicketDto,
    @Req() req: ReqWithUser
  ): Promise<TicketDto> {
    const merchant = await this.merchantService.getMerchantByUserId(req.user.sub);
    if (!(await this.ticketService.isOwnProperty(id, merchant.id))) throw new UnauthorizedException();
    return await this.ticketService.updateTicket(id, ticket);
  }
}
