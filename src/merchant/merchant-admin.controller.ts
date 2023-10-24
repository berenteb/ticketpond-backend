import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse } from '@nestjs/swagger';
import { PermissionGuard } from '../authz/admin.guard';
import { CreateMerchantDto, MerchantDto, UpdateMerchantDto } from '../types/dtos/merchant.dto';
import { Permissions } from '../types/jwt.types';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';

@UseGuards(PermissionGuard(Permissions.ADMIN))
@UseGuards(AuthGuard('jwt'))
@Controller('admin/merchant')
export class MerchantAdminController {
  constructor(private readonly merchantService: MerchantServiceInterface) {}

  @Get()
  @ApiOkResponse({ type: [MerchantDto] })
  async getMerchants(): Promise<MerchantDto[]> {
    return this.merchantService.getMerchants();
  }

  @Get(':id')
  @ApiOkResponse({ type: MerchantDto })
  async getMerchant(@Param('id') id: string): Promise<MerchantDto> {
    return this.merchantService.getMerchantById(id);
  }

  @Post()
  @ApiOkResponse({ type: MerchantDto })
  async createMerchant(@Body() merchant: CreateMerchantDto): Promise<MerchantDto> {
    return this.merchantService.createMerchant(merchant);
  }

  @Patch(':id')
  @ApiOkResponse({ type: MerchantDto })
  async updateMerchant(@Param('id') id: string, @Body() merchant: UpdateMerchantDto): Promise<MerchantDto> {
    return this.merchantService.updateMerchant(id, merchant);
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteMerchant(@Param('id') id: string): Promise<void> {
    return this.merchantService.deleteMerchant(id);
  }
}
