import { Module } from '@nestjs/common';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';
import { InMemoryOrderService } from './in-memory-order.service';
import { OrderController } from './order.controller';

@Module({
  providers: [{ provide: OrderServiceInterface, useClass: InMemoryOrderService }],
  controllers: [OrderController],
})
export class OrderModule {}
