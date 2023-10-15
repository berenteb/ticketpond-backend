import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse } from '@nestjs/swagger';
import { ReqWithUser } from '../types/common.types';
import { CreateExperienceDto, ExperienceDto, UpdateExperienceDto } from '../types/dtos/experience.dto';
import { ExperienceServiceInterface } from '../types/service-interfaces/experience.service.interface';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';

@UseGuards(AuthGuard('jwt'))
@Controller('admin/experience')
export class ExperienceAdminController {
  constructor(
    private readonly experienceService: ExperienceServiceInterface,
    private readonly merchantService: MerchantServiceInterface
  ) {}

  @Get()
  @ApiOkResponse({ type: [ExperienceDto] })
  async getExperiences(@Req() req: ReqWithUser): Promise<ExperienceDto[]> {
    const merchant = await this.merchantService.getMerchantByUserId(req.user.sub);
    return this.experienceService.getExperiencesByMerchantId(merchant.id);
  }

  @Get(':id')
  @ApiOkResponse({ type: ExperienceDto })
  async getExperienceById(@Param('id') id: string): Promise<ExperienceDto> {
    return this.experienceService.getExperienceById(id);
  }

  @Post()
  @ApiOkResponse({ type: ExperienceDto })
  async createExperience(@Body() experience: CreateExperienceDto, @Req() req: ReqWithUser): Promise<ExperienceDto> {
    const merchant = await this.merchantService.getMerchantByUserId(req.user.sub);
    return this.experienceService.createExperience(experience, merchant.id);
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
