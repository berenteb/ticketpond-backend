import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse } from '@nestjs/swagger';
import { PermissionGuard } from '../authz/admin.guard';
import { ExperienceDto, UpdateExperienceDto } from '../types/dtos/experience.dto';
import { Permissions } from '../types/jwt.types';
import { ExperienceServiceInterface } from '../types/service-interfaces/experience.service.interface';

@UseGuards(PermissionGuard(Permissions.ADMIN))
@UseGuards(AuthGuard('jwt'))
@Controller('admin/experience')
export class ExperienceAdminController {
  constructor(private readonly experienceService: ExperienceServiceInterface) {}

  @Get()
  @ApiOkResponse({ type: [ExperienceDto] })
  async getExperiences(): Promise<ExperienceDto[]> {
    return this.experienceService.getExperiences();
  }

  @Get(':id')
  @ApiOkResponse({ type: ExperienceDto })
  async getExperienceById(@Param('id') id: string): Promise<ExperienceDto> {
    return this.experienceService.getExperienceById(id);
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
