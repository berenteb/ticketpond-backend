import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ReqWithUser } from '../types/common.types';
import { DeepOrderWithCustomerDto, OrderWithCustomerDto } from '../types/dtos/order.dto';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';

@UseGuards(AuthGuard('jwt'))
@Controller('admin/order')
export class OrderAdminController {
  constructor(
    private readonly orderService: OrderServiceInterface,
    private readonly merchantService: MerchantServiceInterface
  ) {}

  @Get()
  @ApiOkResponse({ type: [OrderWithCustomerDto] })
  async getOrders(): Promise<OrderWithCustomerDto[]> {
    return await this.orderService.getOrders();
  }

  @Get('me')
  @ApiOkResponse({ type: [OrderWithCustomerDto] })
  async getOrdersByMerchant(@Req() req: ReqWithUser): Promise<OrderWithCustomerDto[]> {
    const merchant = await this.merchantService.getMerchantByUserId(req.user.sub);
    return await this.orderService.getOrdersForMerchant(merchant.id);
  }

  @Get(':id')
  @ApiOkResponse({ type: DeepOrderWithCustomerDto })
  @ApiNotFoundResponse()
  async getOrder(@Param('id') id: string): Promise<DeepOrderWithCustomerDto> {
    return await this.orderService.getOrderByIdWithCustomer(id);
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteOrder(@Param('id') id: string): Promise<void> {
    return await this.orderService.deleteOrder(id);
  }
}
