import { Module } from '@nestjs/common';
import { ExperienceServiceInterface } from '../types/service-interfaces/experience.service.interface';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';

@Module({
  imports: [],
  providers: [{ provide: ExperienceServiceInterface, useClass: ExperienceService }],
  controllers: [ExperienceController],
})
export class ExperienceModule {}
