import { Module } from '@nestjs/common';
import { MerchantModule } from '../merchant/merchant.module';
import { NotificationModule } from '../notification/notification.module';
import { PassModule } from '../pass/pass.module';
import { PrismaService } from '../prisma/prisma.service';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';
import { OrderAdminController } from './order-admin.controller';
import { OrderMerchantController } from './order-merchant.controller';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [PassModule, MerchantModule, NotificationModule],
  providers: [{ provide: OrderServiceInterface, useClass: OrderService }, PrismaService],
  controllers: [OrderController, OrderAdminController, OrderMerchantController],
  exports: [{ provide: OrderServiceInterface, useClass: OrderService }],
})
export class OrderModule {}
