import { Injectable } from '@nestjs/common';
import { OrderView } from '../types/entities/order.entity';
import { PaymentServiceInterface } from '../types/service-interfaces/payment.service.interface';

@Injectable()
export class PaymentService implements PaymentServiceInterface {
  payForOrder(order: OrderView): Promise<void> {
    return Promise.resolve(undefined);
  }

  paymentFail(): Promise<void> {
    return Promise.resolve(undefined);
  }

  paymentSucceed(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
