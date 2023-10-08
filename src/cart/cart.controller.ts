import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ReqWithUser } from '../types/common.types';
import { AddToCartDto, CartDto, RemoveFromCartDto } from '../types/dtos/cart.dto';
import { CartServiceInterface } from '../types/service-interfaces/cart.service.interface';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartServiceInterface) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiOkResponse({ type: CartDto })
  async getCartForMe(@Req() req: ReqWithUser): Promise<CartDto> {
    return this.cartService.getCartForCustomer(req.user.sub);
  }

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

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  @ApiOkResponse({ type: CartDto })
  async addItemToCartByUser(@Body() item: AddToCartDto, @Req() req: ReqWithUser): Promise<CartDto> {
    return this.cartService.addItemToCartForCustomer(req.user.sub, item.ticketId, item.quantity);
  }

  @Post(':id/add')
  @ApiOkResponse({ type: CartDto })
  async addItemToCart(@Param('id') id: string, @Body() item: AddToCartDto): Promise<CartDto> {
    return this.cartService.addItemToCart(id, item.ticketId, item.quantity);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('remove')
  @ApiOkResponse({ type: CartDto })
  async removeItemFromCartByUser(@Body() item: RemoveFromCartDto, @Req() req: ReqWithUser): Promise<CartDto> {
    return this.cartService.removeItemFromCartForCustomer(req.user.sub, item.ticketId, item.quantity);
  }

  @Post(':id/remove')
  @ApiOkResponse({ type: CartDto })
  async removeItemFromCart(@Param('id') id: string, @Body() item: RemoveFromCartDto): Promise<CartDto> {
    return this.cartService.removeItemFromCart(id, item.ticketId, item.quantity);
  }
}
