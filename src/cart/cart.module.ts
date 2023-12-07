import { Module } from '@nestjs/common';
import { OrderModule } from '../order/order.module';
import { PassModule } from '../pass/pass.module';
import { PrismaService } from '../prisma/prisma.service';
import { CartServiceInterface } from '../types/service-interfaces/cart.service.interface';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [OrderModule, PassModule],
  providers: [{ provide: CartServiceInterface, useClass: CartService }, PrismaService],
  controllers: [CartController],
})
export class CartModule {}
