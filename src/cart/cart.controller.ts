import { Controller, Get, Param, Post } from '@nestjs/common';
import { CartServiceInterface } from '../types/service-interfaces/cart.service.interface';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartServiceInterface) {}

  @Get('user/:id')
  async getCartForUser(@Param('id') id: string) {
    return this.cartService.getCartForUser(id);
  }

  @Post(':id/checkout')
  async checkout(@Param('id') id: string) {
    return this.cartService.checkout(id);
  }
}
