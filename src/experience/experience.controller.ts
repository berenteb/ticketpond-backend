import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import {
  CreateExperienceDto,
  DeepExperienceDto,
  ExperienceDto,
  UpdateExperienceDto,
} from '../types/dtos/experience.dto';
import { ExperienceServiceInterface } from '../types/service-interfaces/experience.service.interface';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceServiceInterface) {}

  @Get()
  @ApiOkResponse({ type: ExperienceDto })
  async getExperiences(): Promise<ExperienceDto[]> {
    return this.experienceService.getExperiences();
  }

  @Get(':id')
  @ApiOkResponse({ type: DeepExperienceDto })
  @ApiNotFoundResponse()
  async getExperienceById(@Param('id') id: string): Promise<DeepExperienceDto> {
    return this.experienceService.getExperienceById(id);
  }

  @Post()
  @ApiOkResponse({ type: ExperienceDto })
  async createExperience(@Body() experience: CreateExperienceDto): Promise<ExperienceDto> {
    return this.experienceService.createExperience(experience);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ExperienceDto })
  async updateExperience(@Param('id') id: string, @Body() experience: UpdateExperienceDto): Promise<ExperienceDto> {
    return this.experienceService.updateExperience(id, experience);
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteExperience(@Param('id') id: string): Promise<void> {
    return this.experienceService.deleteExperience(id);
  }
}
