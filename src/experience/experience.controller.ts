import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Experience } from '@prisma/client';
import { CreateExperienceDto, ExperienceDto, UpdateExperienceDto } from '../types/dtos/experience.dto';
import { ExperienceServiceInterface } from '../types/service-interfaces/experience.service.interface';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceServiceInterface) {}

  @Get()
  async getExperiences(): Promise<Experience[]> {
    return this.experienceService.getExperiences();
  }

  @Get(':id')
  async getExperienceById(@Param('id') id: string): Promise<ExperienceDto> {
    return this.experienceService.getExperienceById(id);
  }

  @Post()
  async createExperience(@Body() experience: CreateExperienceDto): Promise<Experience> {
    return this.experienceService.createExperience(experience);
  }

  @Patch(':id')
  async updateExperience(@Param('id') id: string, @Body() experience: UpdateExperienceDto): Promise<Experience> {
    return this.experienceService.updateExperience(id, experience);
  }

  @Delete(':id')
  async deleteExperience(@Param('id') id: string): Promise<void> {
    return this.experienceService.deleteExperience(id);
  }
}
