import { Module } from '@nestjs/common';
import { TicketServiceInterface } from '../types/service-interfaces/ticket.service.interface';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  controllers: [TicketController],
  providers: [{ provide: TicketServiceInterface, useClass: TicketService }],
})
export class TicketModule {}
