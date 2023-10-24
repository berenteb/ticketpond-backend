import { Module } from '@nestjs/common';
import { MerchantService } from '../merchant/merchant.service';
import { PrismaService } from '../prisma/prisma.service';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';
import { TicketServiceInterface } from '../types/service-interfaces/ticket.service.interface';
import { TicketAdminController } from './ticket-admin.controller';
import { TicketMerchantController } from './ticket-merchant.controller';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  controllers: [TicketController, TicketAdminController, TicketMerchantController],
  providers: [
    { provide: TicketServiceInterface, useClass: TicketService },
    { provide: MerchantServiceInterface, useClass: MerchantService },
    PrismaService,
  ],
})
export class TicketModule {}
