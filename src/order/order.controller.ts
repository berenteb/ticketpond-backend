import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { OrderDto } from '../types/dtos/order.dto';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderServiceInterface) {}

  @Get()
  @ApiOkResponse({ type: [OrderDto] })
  async getOrders(): Promise<OrderDto[]> {
    return await this.orderService.getOrders();
  }

  @Get(':id')
  @ApiOkResponse({ type: OrderDto })
  @ApiNotFoundResponse()
  async getOrder(@Param('id') id: string): Promise<OrderDto> {
    return await this.orderService.getOrderById(id);
  }

  @Get('user/:id')
  @ApiOkResponse({ type: [OrderDto] })
  async getOrdersByUser(@Param('id') id: string): Promise<OrderDto[]> {
    return await this.orderService.getOrdersForCustomer(id);
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteOrder(@Param('id') id: string): Promise<void> {
    return await this.orderService.deleteOrder(id);
  }
}
