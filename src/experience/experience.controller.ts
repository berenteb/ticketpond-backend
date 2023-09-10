import { Body, Controller, Get, Post } from '@nestjs/common';
import { WithoutId } from '../types/common.types';
import { ExperienceEntity, ExperienceView } from '../types/entities/experience.entity';
import { ExperienceServiceInterface } from '../types/service-interfaces/experience.service.interface';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceServiceInterface) {}

  @Get()
  getExperiences(): Promise<ExperienceView[]> {
    return this.experienceService.getExperiences();
  }

  @Get(':id')
  getExperienceById(id: string): Promise<ExperienceView> {
    return this.experienceService.getExperienceById(id);
  }

  @Post()
  createExperience(@Body() experience: WithoutId<ExperienceEntity>): Promise<ExperienceEntity> {
    return this.experienceService.createExperience(experience);
  }
}
