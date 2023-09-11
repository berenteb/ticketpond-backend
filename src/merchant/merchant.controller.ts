import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { WithoutId } from '../types/common.types';
import { MerchantEntity } from '../types/entities/merchant.entity';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantServiceInterface) {}

  @Get()
  getMerchants() {
    return this.merchantService.getMerchants();
  }

  @Get(':id')
  getMerchant(@Param('id') id: string) {
    return this.merchantService.getMerchantById(id);
  }

  @Post()
  createMerchant(@Body() merchant: WithoutId<MerchantEntity>) {
    return this.merchantService.createMerchant(merchant);
  }

  @Patch(':id')
  updateMerchant(@Param('id') id: string, @Body() merchant: MerchantEntity) {
    return this.merchantService.updateMerchant(id, merchant);
  }

  @Delete(':id')
  deleteMerchant(@Param('id') id: string) {
    return this.merchantService.deleteMerchant(id);
  }
}
