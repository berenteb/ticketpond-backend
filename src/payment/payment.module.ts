import { Module } from '@nestjs/common';
import { OrderService } from '../order/order.service';
import { PrismaService } from '../prisma/prisma.service';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';
import { PaymentServiceInterface } from '../types/service-interfaces/payment.service.interface';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';

@Module({
  providers: [
    { provide: PaymentServiceInterface, useClass: PaymentService },
    { provide: OrderServiceInterface, useClass: OrderService },
    PrismaService,
  ],
  controllers: [PaymentController],
})
export class PaymentModule {}
