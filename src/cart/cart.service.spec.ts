import { Test, TestingModule } from '@nestjs/testing';
import { CartMock } from '../__mocks__/entities/cart.mock';
import { OrderMock } from '../__mocks__/entities/order.mock';
import { OrderServiceMock } from '../__mocks__/services/orderService.mock';
import { PrismaMock } from '../__mocks__/services/prisma.mock';
import { PrismaService } from '../prisma/prisma.service';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';
import { CartService } from './cart.service';

let service: CartService;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      CartService,
      { provide: PrismaService, useValue: PrismaMock },
      { provide: OrderServiceInterface, useValue: OrderServiceMock },
    ],
  }).compile();

  service = module.get<CartService>(CartService);
});

it('should be return cart', async () => {
  PrismaMock.cart.findUnique.mockResolvedValue(CartMock);

  const cart = await service.getCartById('test-cart-id');
  expect(PrismaMock.cart.findUnique).toBeCalledWith({
    where: { id: 'test-cart-id' },
    include: { items: { include: { ticket: { include: { experience: true } } } } },
  });
  expect(cart).toBe(CartMock);
});

it('should throw not found exception if cart is undefined', () => {
  PrismaMock.cart.findUnique.mockResolvedValue(undefined);

  expect(service.getCartById('test-cart-id')).rejects.toThrow();
});

it('should create cart with customer id', async () => {
  PrismaMock.cart.create.mockResolvedValue(CartMock);

  const cart = await service.createCartForCustomer('test-customer-id');
  expect(PrismaMock.cart.create).toBeCalledWith({
    data: { customerId: 'test-customer-id' },
    include: { items: { include: { ticket: { include: { experience: true } } } } },
  });
  expect(cart).toBe(CartMock);
});

it('should return cart for customer', async () => {
  PrismaMock.cart.findUnique.mockResolvedValue(CartMock);

  const cart = await service.getCartForCustomer('test-customer-id');
  expect(PrismaMock.cart.findUnique).toBeCalledWith({
    where: { customerId: 'test-customer-id' },
    include: { items: { include: { ticket: { include: { experience: true } } } } },
  });
  expect(cart).toBe(CartMock);
});

it('should create a cart if cart not found for customer', async () => {
  PrismaMock.cart.findUnique.mockResolvedValue(undefined);
  PrismaMock.cart.create.mockResolvedValue(CartMock);

  const cart = await service.getCartForCustomer('test-customer-id');
  expect(PrismaMock.cart.create).toBeCalledWith({
    data: { customerId: 'test-customer-id' },
    include: { items: { include: { ticket: { include: { experience: true } } } } },
  });
  expect(cart).toBe(CartMock);
});

it('should delete cart', async () => {
  await service.deleteCart('test-cart-id');
  expect(PrismaMock.cart.delete).toBeCalledWith({ where: { id: 'test-cart-id' } });
});

it('should delete cart for customer', async () => {
  await service.deleteCartForCustomer('test-customer-id');
  expect(PrismaMock.cart.delete).toBeCalledWith({ where: { customerId: 'test-customer-id' } });
});

it('should add an item to cart', async () => {
  PrismaMock.cart.findUnique.mockResolvedValue(CartMock);
  await service.addItemToCart('test-cart-id', 'test-ticket-id', 1);
  expect(PrismaMock.cartItem.create).toBeCalledTimes(1);
  expect(PrismaMock.cartItem.create).toBeCalledWith({ data: { cartId: 'test-cart-id', ticketId: 'test-ticket-id' } });
});

it('should add three items to cart', async () => {
  PrismaMock.cart.findUnique.mockResolvedValue(CartMock);

  await service.addItemToCart('test-cart-id', 'test-ticket-id', 3);
  expect(PrismaMock.cartItem.create).toBeCalledTimes(3);
  expect(PrismaMock.cartItem.create).toHaveBeenNthCalledWith(1, {
    data: { cartId: 'test-cart-id', ticketId: 'test-ticket-id' },
  });
  expect(PrismaMock.cartItem.create).toHaveBeenNthCalledWith(2, {
    data: { cartId: 'test-cart-id', ticketId: 'test-ticket-id' },
  });
  expect(PrismaMock.cartItem.create).toHaveBeenNthCalledWith(3, {
    data: { cartId: 'test-cart-id', ticketId: 'test-ticket-id' },
  });
});

it('should add item to cart for customer', async () => {
  PrismaMock.cart.findUnique.mockResolvedValue(CartMock);

  await service.addItemToCartForCustomer('test-customer-id', 'test-ticket-id', 1);
  expect(PrismaMock.cartItem.create).toBeCalledTimes(1);
  expect(PrismaMock.cartItem.create).toBeCalledWith({ data: { cartId: 'test-cart-id', ticketId: 'test-ticket-id' } });
});

it('should add three items to cart for customer', async () => {
  PrismaMock.cart.findUnique.mockResolvedValue(CartMock);

  await service.addItemToCartForCustomer('test-customer-id', 'test-ticket-id', 3);
  expect(PrismaMock.cartItem.create).toBeCalledTimes(3);
  expect(PrismaMock.cartItem.create).toHaveBeenNthCalledWith(1, {
    data: { cartId: 'test-cart-id', ticketId: 'test-ticket-id' },
  });
  expect(PrismaMock.cartItem.create).toHaveBeenNthCalledWith(2, {
    data: { cartId: 'test-cart-id', ticketId: 'test-ticket-id' },
  });
  expect(PrismaMock.cartItem.create).toHaveBeenNthCalledWith(3, {
    data: { cartId: 'test-cart-id', ticketId: 'test-ticket-id' },
  });
});

it('should remove an item from cart if at least one exists', async () => {
  PrismaMock.cart.findUnique.mockResolvedValue(CartMock);
  PrismaMock.cartItem.findFirst.mockResolvedValue({ id: 'test-cart-item-id' });

  await service.removeItemFromCart('test-cart-id', 'test-ticket-id', 1);
  expect(PrismaMock.cartItem.delete).toBeCalledTimes(1);
  expect(PrismaMock.cartItem.delete).toBeCalledWith({ where: { id: 'test-cart-item-id' } });
});

it('should not remove anything from cart if none exists', async () => {
  PrismaMock.cart.findUnique.mockResolvedValue(CartMock);
  PrismaMock.cartItem.findFirst.mockResolvedValue(undefined);

  await service.removeItemFromCart('test-cart-id', 'test-ticket-id', 1);
  expect(PrismaMock.cartItem.delete).toBeCalledTimes(0);
});

it('should remove three items from cart if at least three exist', async () => {
  PrismaMock.cart.findUnique.mockResolvedValue(CartMock);
  PrismaMock.cartItem.findFirst.mockResolvedValue({ id: 'test-cart-item-id' });

  await service.removeItemFromCart('test-cart-id', 'test-ticket-id', 3);
  expect(PrismaMock.cartItem.delete).toBeCalledTimes(3);
  expect(PrismaMock.cartItem.delete).toHaveBeenNthCalledWith(1, { where: { id: 'test-cart-item-id' } });
  expect(PrismaMock.cartItem.delete).toHaveBeenNthCalledWith(2, { where: { id: 'test-cart-item-id' } });
  expect(PrismaMock.cartItem.delete).toHaveBeenNthCalledWith(3, { where: { id: 'test-cart-item-id' } });
});

it('should remove an item from cart for customer if at least one exists', async () => {
  PrismaMock.cart.findUnique.mockResolvedValue(CartMock);
  PrismaMock.cartItem.findFirst.mockResolvedValue({ id: 'test-cart-item-id' });

  await service.removeItemFromCartForCustomer('test-customer-id', 'test-ticket-id', 1);
  expect(PrismaMock.cartItem.delete).toBeCalledTimes(1);
  expect(PrismaMock.cartItem.delete).toBeCalledWith({ where: { id: 'test-cart-item-id' } });
});

it('should remove three items from cart for customer if at least three exist', async () => {
  PrismaMock.cart.findUnique.mockResolvedValue(CartMock);
  PrismaMock.cartItem.findFirst.mockResolvedValue({ id: 'test-cart-item-id' });

  await service.removeItemFromCartForCustomer('test-customer-id', 'test-ticket-id', 3);
  expect(PrismaMock.cartItem.delete).toBeCalledTimes(3);
  expect(PrismaMock.cartItem.delete).toHaveBeenNthCalledWith(1, { where: { id: 'test-cart-item-id' } });
  expect(PrismaMock.cartItem.delete).toHaveBeenNthCalledWith(2, { where: { id: 'test-cart-item-id' } });
  expect(PrismaMock.cartItem.delete).toHaveBeenNthCalledWith(3, { where: { id: 'test-cart-item-id' } });
});

it('should get cart, create order and delete cart, then return order', async () => {
  PrismaMock.cart.findUnique.mockResolvedValue(CartMock);
  OrderServiceMock.createOrder.mockResolvedValue(OrderMock);

  const order = await service.checkout('test-cart-id');
  expect(PrismaMock.cart.findUnique).toBeCalledWith({
    where: { id: 'test-cart-id' },
    include: { items: { include: { ticket: { include: { experience: true } } } } },
  });
  expect(OrderServiceMock.createOrder).toBeCalledWith(CartMock);
  expect(PrismaMock.cart.delete).toBeCalledWith({ where: { id: 'test-cart-id' } });
  expect(order).toEqual(OrderMock);
});
