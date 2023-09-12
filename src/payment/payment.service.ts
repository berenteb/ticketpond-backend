import { Injectable } from '@nestjs/common';
import { OrderView } from '../types/entities/order.entity';
import { PaymentServiceInterface } from '../types/service-interfaces/payment.service.interface';

@Injectable()
export class PaymentService implements PaymentServiceInterface {
  async payForOrder(order: OrderView): Promise<void> {}

  async paymentFail(): Promise<void> {}

  async paymentSucceed(): Promise<void> {}
}
