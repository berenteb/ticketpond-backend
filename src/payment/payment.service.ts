import { Injectable } from '@nestjs/common';
import { OrderDto } from '../types/dtos/order.dto';
import { PaymentServiceInterface } from '../types/service-interfaces/payment.service.interface';

@Injectable()
export class PaymentService implements PaymentServiceInterface {
  async payForOrder(order: OrderDto): Promise<void> {}

  async paymentFail(): Promise<void> {}

  async paymentSucceed(): Promise<void> {}
}
