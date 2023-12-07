import { Body, Controller, Get, Param, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse } from '@nestjs/swagger';
import { ReqWithUser } from '../types/common.types';
import { CreateMerchantDto, MerchantDto } from '../types/dtos/merchant.dto';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';

@Controller('merchant')
export class MerchantController {
  constructor(private readonly merchantService: MerchantServiceInterface) {}

  @Get(':id')
  @ApiOkResponse({ type: MerchantDto })
  async getMerchant(@Param('id') id: string): Promise<MerchantDto> {
    return this.merchantService.getMerchantById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('register')
  @ApiOkResponse({ type: MerchantDto })
  async registerMerchant(@Body() merchant: CreateMerchantDto, @Req() req: ReqWithUser): Promise<MerchantDto> {
    const userId = req.user.sub;
    if (!userId) throw new UnauthorizedException();
    const createdMerchant = await this.merchantService.createMerchant(merchant);
    await this.merchantService.assignCustomerToMerchant(createdMerchant.id, userId);
    return createdMerchant;
  }
}
