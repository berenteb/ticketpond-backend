import { Module } from '@nestjs/common';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  providers: [{ provide: OrderServiceInterface, useClass: OrderService }],
  controllers: [OrderController],
})
export class OrderModule {}
