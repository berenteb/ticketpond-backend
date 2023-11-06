import { Module } from '@nestjs/common';
import { OrderModule } from '../order/order.module';
import { PaymentServiceInterface } from '../types/service-interfaces/payment.service.interface';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [OrderModule],
  providers: [{ provide: PaymentServiceInterface, useClass: PaymentService }],
  controllers: [PaymentController],
})
export class PaymentModule {}
