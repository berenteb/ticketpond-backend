import { Controller, Delete, Get, Param } from '@nestjs/common';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderServiceInterface) {}

  @Get()
  async getOrders() {
    return await this.orderService.getOrders();
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return await this.orderService.getOrderById(id);
  }

  @Get('user/:id')
  async getOrdersByUser(@Param('id') id: string) {
    return await this.orderService.getOrdersForCustomer(id);
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: string) {
    return await this.orderService.deleteOrder(id);
  }
}
