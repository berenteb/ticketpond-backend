import { Controller, Get, Param, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { PermissionGuard } from '../authz/admin.guard';
import { ReqWithUser } from '../types/common.types';
import { DeepOrderWithCustomerDto, OrderWithCustomerDto } from '../types/dtos/order.dto';
import { Permissions } from '../types/jwt.types';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';

@UseGuards(PermissionGuard(Permissions.MERCHANT))
@UseGuards(AuthGuard('jwt'))
@Controller('merchant-admin/order')
export class OrderMerchantController {
  constructor(
    private readonly orderService: OrderServiceInterface,
    private readonly merchantService: MerchantServiceInterface
  ) {}

  @Get()
  @ApiOkResponse({ type: [OrderWithCustomerDto] })
  async getOrders(@Req() req: ReqWithUser): Promise<OrderWithCustomerDto[]> {
    const merchant = await this.merchantService.getMerchantByUserId(req.user.sub);
    return await this.orderService.getOrdersForMerchant(merchant.id);
  }

  @Get(':id')
  @ApiOkResponse({ type: DeepOrderWithCustomerDto })
  @ApiNotFoundResponse()
  async getOrder(@Param('id') id: string, @Req() req: ReqWithUser): Promise<DeepOrderWithCustomerDto> {
    const merchant = await this.merchantService.getMerchantByUserId(req.user.sub);
    if (!(await this.orderService.isConnectedToMerchant(id, merchant.id))) throw new UnauthorizedException();
    return await this.orderService.getOrderByIdWithCustomer(id);
  }
}
