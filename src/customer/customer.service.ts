import { Injectable } from '@nestjs/common';
import { WithoutId } from '../types/common.types';
import { CustomerEntity } from '../types/entities/customer.entity';
import { CustomerServiceInterface } from '../types/service-interfaces/customer.service.interface';

@Injectable()
export class CustomerService extends CustomerServiceInterface {
  createCustomer(customer: WithoutId<CustomerEntity>): Promise<CustomerEntity> {
    return Promise.resolve(undefined);
  }

  deleteCustomer(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  getCustomerById(id: string): Promise<CustomerEntity> {
    return Promise.resolve(undefined);
  }

  getCustomers(): Promise<CustomerEntity[]> {
    return Promise.resolve([]);
  }

  updateCustomer(id: string, customer: WithoutId<CustomerEntity>): Promise<CustomerEntity> {
    return Promise.resolve(undefined);
  }
}
