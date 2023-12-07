import { Test, TestingModule } from '@nestjs/testing';
import { CustomerMock } from '../__mocks__/entities/customer.mock';
import { CustomerServiceMock } from '../__mocks__/services/customerService.mock';
import { CustomerServiceInterface } from '../types/service-interfaces/customer.service.interface';
import { CustomerAdminController } from './customer-admin.controller';

let controller: CustomerAdminController;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [{ provide: CustomerServiceInterface, useValue: CustomerServiceMock }],
    controllers: [CustomerAdminController],
  }).compile();

  controller = module.get<CustomerAdminController>(CustomerAdminController);
});

it('should get customers', async () => {
  CustomerServiceMock.getCustomers.mockResolvedValue([CustomerMock]);
  const customers = await controller.getCustomers();
  expect(customers).toEqual([CustomerMock]);
});

it('should get customer by internal id', async () => {
  CustomerServiceMock.getCustomerByInternalId.mockResolvedValue(CustomerMock);
  const customer = await controller.getCustomerByInternalId('test-customer-internal-id');
  expect(customer).toEqual(CustomerMock);
});

it('should create customer', async () => {
  CustomerServiceMock.createCustomer.mockResolvedValue(CustomerMock);
  const customer = await controller.createCustomer(CustomerMock);
  expect(customer).toEqual(CustomerMock);
});

it('should update customer by internal id', async () => {
  CustomerServiceMock.updateCustomerByInternalId.mockResolvedValue(CustomerMock);
  const customer = await controller.updateCustomerByInternalId('test-customer-internal-id', CustomerMock);
  expect(customer).toEqual(CustomerMock);
});

it('should delete customer by internal id', async () => {
  await controller.deleteCustomerByInternalId('test-customer-internal-id');
  expect(CustomerServiceMock.deleteCustomer).toHaveBeenCalledWith('test-customer-internal-id');
});
