import { Test, TestingModule } from '@nestjs/testing';
import { CustomerMock } from '../__mocks__/entities/customer.mock';
import { CustomerServiceMock } from '../__mocks__/services/customerService.mock';
import { ReqWithUser } from '../types/common.types';
import { CustomerServiceInterface } from '../types/service-interfaces/customer.service.interface';
import { CustomerController } from './customer.controller';

let controller: CustomerController;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [{ provide: CustomerServiceInterface, useValue: CustomerServiceMock }],
    controllers: [CustomerController],
  }).compile();

  controller = module.get<CustomerController>(CustomerController);
});

it('should get customer of current user', async () => {
  CustomerServiceMock.getCustomerById.mockResolvedValue(CustomerMock);
  const req = { user: { sub: 'test-customer-id' } } as ReqWithUser;
  const customer = await controller.getMe(req);
  expect(customer).toEqual(CustomerMock);
});

it('should get permissions of current user', async () => {
  const req = { user: { permissions: ['admin:all'] } } as ReqWithUser;
  const permissions = await controller.getPermissions(req);
  expect(permissions).toEqual(['admin:all']);
});

it('should register customer of current user', async () => {
  CustomerServiceMock.createCustomer.mockResolvedValue(CustomerMock);
  const req = { user: { sub: 'test-customer-id' } } as ReqWithUser;
  const customer = await controller.registerCustomer(CustomerMock, req);
  expect(CustomerServiceMock.createCustomer).toHaveBeenCalledWith(CustomerMock, 'test-customer-id');
  expect(customer).toEqual(CustomerMock);
});
