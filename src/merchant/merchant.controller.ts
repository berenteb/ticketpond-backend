import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateMerchantDto, MerchantDto, UpdateMerchantDto } from '../types/dtos/merchant.dto';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';

@Controller('merchant')
export class MerchantController {
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
