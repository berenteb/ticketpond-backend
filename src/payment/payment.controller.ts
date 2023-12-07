import {
  BadRequestException,
  Controller,
  Logger,
  Param,
  Post,
  RawBodyRequest,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse } from '@nestjs/swagger';
import { PaymentStatus } from '@prisma/client';
import { ReqWithUser } from '../types/common.types';
import { PaymentDto } from '../types/dtos/payment.dto';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';
import { PaymentServiceInterface } from '../types/service-interfaces/payment.service.interface';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentServiceInterface,
    private readonly orderService: OrderServiceInterface
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('intent/:id')
  @ApiOkResponse({ type: PaymentDto })
  async createPaymentIntent(@Param('id') id: string, @Req() req: ReqWithUser): Promise<PaymentDto> {
    if (!(await this.orderService.isOwnProperty(id, req.user.sub))) throw new UnauthorizedException();
    const order = await this.orderService.getOrderById(id);
    if (order.paymentStatus === PaymentStatus.SUCCESS) throw new BadRequestException('Order already paid');
    return this.paymentService.createIntent(order);
  }

  @Post('webhook')
  async handleWebhook(@Req() req: RawBodyRequest<Request>): Promise<void> {
    Logger.log(typeof req.rawBody, PaymentController.name);
    return this.paymentService.handleWebhook(req, req.rawBody);
  }
}
