import { Module } from '@nestjs/common';
import { InMemoryTicketService } from './in-memory-ticket-service';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  controllers: [TicketController],
  providers: [{ provide: TicketService, useClass: InMemoryTicketService }],
})
export class TicketModule {}
