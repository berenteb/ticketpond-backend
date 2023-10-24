import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse } from '@nestjs/swagger';
import { PermissionGuard } from '../authz/admin.guard';
import { ReqWithUser } from '../types/common.types';
import { CreateExperienceDto, ExperienceDto, UpdateExperienceDto } from '../types/dtos/experience.dto';
import { Permissions } from '../types/jwt.types';
import { ExperienceServiceInterface } from '../types/service-interfaces/experience.service.interface';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';

@UseGuards(PermissionGuard(Permissions.MERCHANT))
@UseGuards(AuthGuard('jwt'))
@Controller('merchant-admin/experience')
export class ExperienceMerchantController {
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
  async getExperienceById(@Param('id') id: string, @Req() req: ReqWithUser): Promise<ExperienceDto> {
    const merchant = await this.merchantService.getMerchantByUserId(req.user.sub);
    if (!(await this.experienceService.isOwnProperty(id, merchant.id))) throw new UnauthorizedException();
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
  async updateExperience(
    @Param('id') id: string,
    @Body() experience: UpdateExperienceDto,
    @Req() req: ReqWithUser
  ): Promise<ExperienceDto> {
    const merchant = await this.merchantService.getMerchantByUserId(req.user.sub);
    if (!(await this.experienceService.isOwnProperty(id, merchant.id))) throw new UnauthorizedException();
    return this.experienceService.updateExperience(id, experience);
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteExperience(@Param('id') id: string, @Req() req: ReqWithUser): Promise<void> {
    const merchant = await this.merchantService.getMerchantByUserId(req.user.sub);
    if (!(await this.experienceService.isOwnProperty(id, merchant.id))) throw new UnauthorizedException();
    return this.experienceService.deleteExperience(id);
  }
}
