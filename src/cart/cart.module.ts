import { Module } from '@nestjs/common';
import { InMemoryOrderService } from '../order/in-memory-order.service';
import { CartServiceInterface } from '../types/service-interfaces/cart.service.interface';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  providers: [
    { provide: CartServiceInterface, useClass: CartService },
    { provide: OrderServiceInterface, useClass: InMemoryOrderService },
  ],
  controllers: [CartController],
})
export class CartModule {}
