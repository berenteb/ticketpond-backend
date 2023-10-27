import { Module } from '@nestjs/common';
import { MerchantService } from '../merchant/merchant.service';
import { AppleService } from '../pass/apple.service';
import { PassService } from '../pass/pass.service';
import { PrismaService } from '../prisma/prisma.service';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';
import { PassServiceInterface } from '../types/service-interfaces/pass.service.interface';
import { OrderAdminController } from './order-admin.controller';
import { OrderMerchantController } from './order-merchant.controller';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  providers: [
    { provide: OrderServiceInterface, useClass: OrderService },
    { provide: MerchantServiceInterface, useClass: MerchantService },
    { provide: PassServiceInterface, useClass: PassService },
    AppleService,
    PrismaService,
  ],
  controllers: [OrderController, OrderAdminController, OrderMerchantController],
})
export class OrderModule {}
