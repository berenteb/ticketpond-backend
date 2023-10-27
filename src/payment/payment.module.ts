import { Module } from '@nestjs/common';
import { OrderService } from '../order/order.service';
import { AppleService } from '../pass/apple.service';
import { PassService } from '../pass/pass.service';
import { PrismaService } from '../prisma/prisma.service';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';
import { PassServiceInterface } from '../types/service-interfaces/pass.service.interface';
import { PaymentServiceInterface } from '../types/service-interfaces/payment.service.interface';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';

@Module({
  providers: [
    { provide: PaymentServiceInterface, useClass: PaymentService },
    { provide: OrderServiceInterface, useClass: OrderService },
    { provide: PassServiceInterface, useClass: PassService },
    AppleService,
    PrismaService,
  ],
  controllers: [PaymentController],
})
export class PaymentModule {}
