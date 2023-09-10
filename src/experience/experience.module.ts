import { Module } from '@nestjs/common';
import { ExperienceServiceInterface } from '../types/service-interfaces/experience.service.interface';
import { ExperienceController } from './experience.controller';
import { InMemoryExperienceService } from './in-memory-experience.service';

@Module({
  providers: [{ provide: ExperienceServiceInterface, useClass: InMemoryExperienceService }],
  controllers: [ExperienceController],
})
export class ExperienceModule {}
