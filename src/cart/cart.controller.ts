import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { AddToCartDto, CartDto, RemoveFromCartDto } from '../types/dtos/cart.dto';
import { CartServiceInterface } from '../types/service-interfaces/cart.service.interface';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartServiceInterface) {}

  @Get('user/:id')
  @ApiOkResponse({ type: CartDto })
  @ApiNotFoundResponse()
  async getCartForUser(@Param('id') id: string): Promise<CartDto> {
    return this.cartService.getCartForCustomer(id);
  }

  @Post(':id/checkout')
  @ApiOkResponse()
  async checkout(@Param('id') id: string): Promise<void> {
    return this.cartService.checkout(id);
  }

  @Post(':id/add')
  @ApiOkResponse({ type: CartDto })
  async addItemToCart(@Param('id') id: string, @Body() item: AddToCartDto): Promise<CartDto> {
    return this.cartService.addItemToCart(id, item.ticketId, item.quantity);
  }

  @Post(':id/remove')
  @ApiOkResponse({ type: CartDto })
  async removeItemFromCart(@Param('id') id: string, @Body() item: RemoveFromCartDto): Promise<CartDto> {
    return this.cartService.removeItemFromCart(id, item.ticketId, item.quantity);
  }
}
