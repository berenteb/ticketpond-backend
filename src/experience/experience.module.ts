import { Module } from '@nestjs/common';
import { InMemoryTicketService } from '../ticket/in-memory-ticket-service';
import { ExperienceServiceInterface } from '../types/service-interfaces/experience.service.interface';
import { TicketServiceInterface } from '../types/service-interfaces/ticket.service.interface';
import { ExperienceController } from './experience.controller';
import { InMemoryExperienceService } from './in-memory-experience.service';

@Module({
  imports: [],
  providers: [
    { provide: ExperienceServiceInterface, useClass: InMemoryExperienceService },
    { provide: TicketServiceInterface, useClass: InMemoryTicketService },
  ],
  controllers: [ExperienceController],
})
export class ExperienceModule {}
