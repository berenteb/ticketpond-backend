import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  providers: [{ provide: OrderServiceInterface, useClass: OrderService }, PrismaService],
  controllers: [OrderController],
})
export class OrderModule {}
