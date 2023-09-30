import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddToCartDto, RemoveFromCartDto } from '../types/dtos/cart.dto';
import { CartServiceInterface } from '../types/service-interfaces/cart.service.interface';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartServiceInterface) {}

  @Get('user/:id')
  async getCartForUser(@Param('id') id: string) {
    return this.cartService.getCartForCustomer(id);
  }

  @Post(':id/checkout')
  async checkout(@Param('id') id: string) {
    return this.cartService.checkout(id);
  }

  @Post(':id/add')
  async addItemToCart(@Param('id') id: string, @Body() item: AddToCartDto) {
    return this.cartService.addItemToCart(id, item.ticketId, item.quantity);
  }

  @Post(':id/remove')
  async removeItemFromCart(@Param('id') id: string, @Body() item: RemoveFromCartDto) {
    return this.cartService.removeItemFromCart(id, item.ticketId, item.quantity);
  }
}
