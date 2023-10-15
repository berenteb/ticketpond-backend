import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ReqWithUser } from '../types/common.types';
import { DeepOrderDto, OrderDto } from '../types/dtos/order.dto';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';

@UseGuards(AuthGuard('jwt'))
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderServiceInterface) {}

  @Get('me')
  @ApiOkResponse({ type: [OrderDto] })
  async getOrdersByUser(@Req() req: ReqWithUser): Promise<OrderDto[]> {
    return await this.orderService.getOrdersForCustomer(req.user.sub);
  }

  @Get(':id')
  @ApiOkResponse({ type: DeepOrderDto })
  @ApiNotFoundResponse()
  async getOrder(@Param('id') id: string): Promise<DeepOrderDto> {
    return await this.orderService.getOrderById(id);
  }
}
