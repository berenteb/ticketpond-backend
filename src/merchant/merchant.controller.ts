import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Merchant } from '@prisma/client';
import { CreateMerchantDto, UpdateMerchantDto } from '../types/dtos/merchant.dto';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantServiceInterface) {}

  @Get()
  async getMerchants(): Promise<Merchant[]> {
    return this.merchantService.getMerchants();
  }

  @Get(':id')
  async getMerchant(@Param('id') id: string): Promise<Merchant> {
    return this.merchantService.getMerchantById(id);
  }

  @Post()
  async createMerchant(@Body() merchant: CreateMerchantDto): Promise<Merchant> {
    return this.merchantService.createMerchant(merchant);
  }

  @Patch(':id')
  async updateMerchant(@Param('id') id: string, @Body() merchant: UpdateMerchantDto): Promise<Merchant> {
    return this.merchantService.updateMerchant(id, merchant);
  }

  @Delete(':id')
  async deleteMerchant(@Param('id') id: string): Promise<void> {
    return this.merchantService.deleteMerchant(id);
  }
}
