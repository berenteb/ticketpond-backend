import { Controller, Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { DeepExperienceDto } from '../types/dtos/deep-experience.dto';
import { ExperienceDto } from '../types/dtos/experience.dto';
import { ExperienceServiceInterface } from '../types/service-interfaces/experience.service.interface';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceServiceInterface) {}

  @Get()
  @ApiOkResponse({ type: [ExperienceDto] })
  async getExperiences(): Promise<ExperienceDto[]> {
    return this.experienceService.getExperiences();
  }

  @Get(':id')
  @ApiOkResponse({ type: DeepExperienceDto })
  @ApiNotFoundResponse()
  async getExperienceById(@Param('id') id: string): Promise<DeepExperienceDto> {
    return this.experienceService.getExperienceById(id);
  }
}
