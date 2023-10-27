import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { PermissionGuard } from '../authz/admin.guard';
import { DeepOrderWithCustomerDto, OrderWithCustomerDto } from '../types/dtos/order.dto';
import { Permissions } from '../types/jwt.types';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';

@UseGuards(PermissionGuard(Permissions.ADMIN))
@UseGuards(AuthGuard('jwt'))
@Controller('admin/order')
export class OrderAdminController {
  constructor(private readonly orderService: OrderServiceInterface) {}

  @Get()
  @ApiOkResponse({ type: [OrderWithCustomerDto] })
  async getOrders(): Promise<OrderWithCustomerDto[]> {
    return await this.orderService.getOrders();
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

  @Post('fulfill/:id')
  @ApiOkResponse()
  async fulfillOrder(@Param('id') id: string): Promise<void> {
    return await this.orderService.fulfillOrder(id);
  }

  @Post('cancel/:id')
  @ApiOkResponse()
  async cancelOrder(@Param('id') id: string): Promise<void> {
    return await this.orderService.cancelOrder(id);
  }
}
