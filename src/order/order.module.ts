import { Module } from '@nestjs/common';
import { MerchantService } from '../merchant/merchant.service';
import { PrismaService } from '../prisma/prisma.service';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';
import { OrderAdminController } from './order-admin.controller';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  providers: [
    { provide: OrderServiceInterface, useClass: OrderService },
    { provide: MerchantServiceInterface, useClass: MerchantService },
    PrismaService,
  ],
  controllers: [OrderController, OrderAdminController],
})
export class OrderModule {}
