import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse } from '@nestjs/swagger';
import { ReqWithUser } from '../types/common.types';
import { AddToCartDto, CartDto, RemoveFromCartDto } from '../types/dtos/cart.dto';
import { CartServiceInterface } from '../types/service-interfaces/cart.service.interface';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';

@UseGuards(AuthGuard('jwt'))
@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartServiceInterface,
    private readonly orderService: OrderServiceInterface
  ) {}

  @Get('me')
  @ApiOkResponse({ type: CartDto })
  async getCartForMe(@Req() req: ReqWithUser): Promise<CartDto> {
    return this.cartService.getCartForCustomer(req.user.sub);
  }

  @Post('me/checkout')
  @ApiOkResponse({ type: String })
  async checkoutForMe(@Req() req: ReqWithUser): Promise<string> {
    const cart = await this.cartService.getCartForCustomer(req.user.sub);
    if (cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }
    const order = await this.cartService.checkout(cart.id);
    if (!order) {
      throw new BadRequestException('Could not checkout');
    }
    const sum = order.items.reduce((acc, item) => acc + item.price, 0);
    if (sum === 0) {
      await this.orderService.fulfillOrder(order.id);
      return '/profile/orders/' + order.id;
    }
    return '/payment/' + order.id;
  }

  @Post('add')
  @ApiOkResponse({ type: CartDto })
  async addItemToCartByUser(@Body() item: AddToCartDto, @Req() req: ReqWithUser): Promise<CartDto> {
    return this.cartService.addItemToCartForCustomer(req.user.sub, item.ticketId, item.quantity);
  }

  @Post('remove')
  @ApiOkResponse({ type: CartDto })
  async removeItemFromCartByUser(@Body() item: RemoveFromCartDto, @Req() req: ReqWithUser): Promise<CartDto> {
    return this.cartService.removeItemFromCartForCustomer(req.user.sub, item.ticketId, item.quantity);
  }
}
