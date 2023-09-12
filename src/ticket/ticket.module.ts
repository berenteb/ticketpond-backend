import { Module } from '@nestjs/common';
import { TicketServiceInterface } from '../types/service-interfaces/ticket.service.interface';
import { InMemoryTicketService } from './in-memory-ticket-service';
import { TicketController } from './ticket.controller';

@Module({
  controllers: [TicketController],
  providers: [{ provide: TicketServiceInterface, useClass: InMemoryTicketService }],
})
export class TicketModule {}
