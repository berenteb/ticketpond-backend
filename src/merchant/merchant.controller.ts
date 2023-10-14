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
import { ReqWithUser } from '../types/common.types';
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

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiOkResponse({ type: MerchantDto })
  async getMe(@Req() req: ReqWithUser): Promise<MerchantDto> {
    return await this.merchantService.getMerchantByUserId(req.user.sub);
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
