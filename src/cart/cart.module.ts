import { Module } from '@nestjs/common';
import { OrderService } from '../order/order.service';
import { AppleService } from '../pass/apple.service';
import { PassService } from '../pass/pass.service';
import { PrismaService } from '../prisma/prisma.service';
import { CartServiceInterface } from '../types/service-interfaces/cart.service.interface';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';
import { PassServiceInterface } from '../types/service-interfaces/pass.service.interface';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  providers: [
    { provide: CartServiceInterface, useClass: CartService },
    { provide: OrderServiceInterface, useClass: OrderService },
    { provide: PassServiceInterface, useClass: PassService },
    AppleService,
    PrismaService,
  ],
  controllers: [CartController],
})
export class CartModule {}
