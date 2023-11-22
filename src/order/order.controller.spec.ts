import { Test, TestingModule } from '@nestjs/testing';
import { OrderServiceMock } from '../__mocks__/orderService.mock';
import { OrderServiceInterface } from '../types/service-interfaces/order.service.interface';
import { OrderController } from './order.controller';

let controller: OrderController;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [{ provide: OrderServiceInterface, useValue: OrderServiceMock }],
    controllers: [OrderController],
  }).compile();

  controller = module.get<OrderController>(OrderController);
});

it('should be defined', () => {
  expect(controller).toBeDefined();
});
