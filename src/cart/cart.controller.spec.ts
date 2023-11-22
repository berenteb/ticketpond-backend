import { Test, TestingModule } from '@nestjs/testing';
import { CartMock } from '../__mocks__/cart.mock';
import { CartServiceMock } from '../__mocks__/cartService.mock';
import { OrderMock } from '../__mocks__/order.mock';
import { OrderServiceMock } from '../__mocks__/orderService.mock';
import { PrismaMock } from '../__mocks__/prisma.mock';
import { PrismaService } from '../prisma/prisma.service';
import { ReqWithUser } from '../types/common.types';
import { CartServiceInterface } from '../types/service-interfaces/cart.service.interface';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';
import { CartController } from './cart.controller';

let controller: CartController;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      { provide: CartServiceInterface, useValue: CartServiceMock },
      { provide: OrderServiceInterface, useValue: OrderServiceMock },
      { provide: PrismaService, useValue: PrismaMock },
    ],
    controllers: [CartController],
  }).compile();

  controller = module.get<CartController>(CartController);
});

it('should get cart for user by user sub', async () => {
  CartServiceMock.getCartForCustomer.mockResolvedValue(CartMock);
  const cart = await controller.getCartForMe({ user: { sub: 'test-user-sub' } } as ReqWithUser);
  expect(CartServiceMock.getCartForCustomer).toBeCalledWith('test-user-sub');
  expect(cart).toBe(CartMock);
});

it('should checkout cart for user by user sub and return payment url', async () => {
  CartServiceMock.getCartForCustomer.mockResolvedValue(CartMock);
  CartServiceMock.checkout.mockResolvedValue(OrderMock);
  const checkout = await controller.checkoutForMe({ user: { sub: 'test-user-sub' } } as ReqWithUser);
  expect(CartServiceMock.getCartForCustomer).toBeCalledWith('test-user-sub');
  expect(CartServiceMock.checkout).toBeCalledWith(CartMock.id);
  expect(checkout).toBe('/payment/test-order-id');
});

it('should throw bad request exception if cart is empty when checking out cart for user by user sub', async () => {
  CartServiceMock.getCartForCustomer.mockResolvedValue({ ...CartMock, items: [] });
  await expect(controller.checkoutForMe({ user: { sub: 'test-user-sub' } } as ReqWithUser)).rejects.toThrow();
});

it('should throw if order is undefined when checking out cart for user by user sub', async () => {
  CartServiceMock.getCartForCustomer.mockResolvedValue(CartMock);
  CartServiceMock.checkout.mockResolvedValue(undefined);
  await expect(controller.checkoutForMe({ user: { sub: 'test-user-sub' } } as ReqWithUser)).rejects.toThrow();
});

it("should return order url if order's sum is 0 when checking out cart for user by user sub", async () => {
  CartServiceMock.getCartForCustomer.mockResolvedValue(CartMock);
  CartServiceMock.checkout.mockResolvedValue({ ...OrderMock, items: [{ ...OrderMock.items[0], price: 0 }] });
  const checkout = await controller.checkoutForMe({ user: { sub: 'test-user-sub' } } as ReqWithUser);
  expect(CartServiceMock.getCartForCustomer).toBeCalledWith('test-user-sub');
  expect(CartServiceMock.checkout).toBeCalledWith(CartMock.id);
  expect(checkout).toBe('/profile/orders/test-order-id');
});

it('should add an item to cart by user', async () => {
  CartServiceMock.addItemToCartForCustomer.mockResolvedValue(CartMock);
  const cart = await controller.addItemToCartByUser({ ticketId: 'test-ticket-id', quantity: 1 }, {
    user: { sub: 'test-user-sub' },
  } as ReqWithUser);
  expect(CartServiceMock.addItemToCartForCustomer).toBeCalledWith('test-user-sub', 'test-ticket-id', 1);
  expect(cart).toBe(CartMock);
});

it('should add three items to cart by user', async () => {
  CartServiceMock.addItemToCartForCustomer.mockResolvedValue(CartMock);
  const cart = await controller.addItemToCartByUser({ ticketId: 'test-ticket-id', quantity: 3 }, {
    user: { sub: 'test-user-sub' },
  } as ReqWithUser);
  expect(CartServiceMock.addItemToCartForCustomer).toBeCalledWith('test-user-sub', 'test-ticket-id', 3);
  expect(cart).toBe(CartMock);
});

it('should remove an item from cart by user', async () => {
  CartServiceMock.removeItemFromCartForCustomer.mockResolvedValue(CartMock);
  const cart = await controller.removeItemFromCartByUser({ ticketId: 'test-ticket-id', quantity: 1 }, {
    user: { sub: 'test-user-sub' },
  } as ReqWithUser);
  expect(CartServiceMock.removeItemFromCartForCustomer).toBeCalledWith('test-user-sub', 'test-ticket-id', 1);
  expect(cart).toBe(CartMock);
});

it('should remove three items from cart by user', async () => {
  CartServiceMock.removeItemFromCartForCustomer.mockResolvedValue(CartMock);
  const cart = await controller.removeItemFromCartByUser({ ticketId: 'test-ticket-id', quantity: 3 }, {
    user: { sub: 'test-user-sub' },
  } as ReqWithUser);
  expect(CartServiceMock.removeItemFromCartForCustomer).toBeCalledWith('test-user-sub', 'test-ticket-id', 3);
  expect(cart).toBe(CartMock);
});
