import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { PermissionGuard } from '../authz/admin.guard';
import { DeepOrderWithCustomerDto, OrderWithCustomerDto } from '../types/dtos/order.dto';
import { Permissions } from '../types/jwt.types';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';

@UseGuards(AuthGuard('jwt'))
@UseGuards(PermissionGuard(Permissions.ADMIN))
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
}
