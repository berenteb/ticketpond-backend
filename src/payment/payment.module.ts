import { Module } from '@nestjs/common';
import { PaymentServiceInterface } from '../types/service-interfaces/payment.service.interface';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';

@Module({
  providers: [{ provide: PaymentServiceInterface, useClass: PaymentService }],
  controllers: [PaymentController],
})
export class PaymentModule {}
