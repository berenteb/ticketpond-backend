import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse } from '@nestjs/swagger';
import { PermissionGuard } from '../authz/admin.guard';
import { ReqWithUser } from '../types/common.types';
import { MerchantDto, UpdateMerchantDto } from '../types/dtos/merchant.dto';
import { Permissions } from '../types/jwt.types';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';

@UseGuards(PermissionGuard(Permissions.MERCHANT))
@UseGuards(AuthGuard('jwt'))
@Controller('merchant-self/me')
export class MerchantSelfController {
  constructor(private readonly merchantService: MerchantServiceInterface) {}

  @Get()
  @ApiOkResponse({ type: MerchantDto })
  async getMerchantMe(@Req() req: ReqWithUser): Promise<MerchantDto> {
    return await this.merchantService.getMerchantByUserId(req.user.sub);
  }

  @Patch()
  @ApiOkResponse({ type: MerchantDto })
  async updateMerchantMe(@Body() updateMerchantDto: UpdateMerchantDto, @Req() req: ReqWithUser): Promise<MerchantDto> {
    const merchantForUser = await this.merchantService.getMerchantByUserId(req.user.sub);
    return this.merchantService.updateMerchant(merchantForUser.id, updateMerchantDto);
  }
}
