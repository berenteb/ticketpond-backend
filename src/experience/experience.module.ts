import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ExperienceServiceInterface } from '../types/service-interfaces/experience.service.interface';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';

@Module({
  providers: [{ provide: ExperienceServiceInterface, useClass: ExperienceService }, PrismaService],
  controllers: [ExperienceController],
})
export class ExperienceModule {}
