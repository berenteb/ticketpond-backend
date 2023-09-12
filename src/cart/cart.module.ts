import { Module } from '@nestjs/common';
import { CartServiceInterface } from '../types/service-interfaces/cart.service.interface';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
  providers: [{ provide: CartServiceInterface, useClass: CartService }],
  controllers: [CartController],
})
export class CartModule {}
