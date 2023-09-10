import { WithoutId } from '../common.types';
import { CustomerEntity } from '../entities/customer.entity';

export abstract class CustomerServiceInterface {
  abstract getCustomers(): Promise<CustomerEntity[]>;
  abstract getCustomerById(id: string): Promise<CustomerEntity>;
  abstract createCustomer(customer: WithoutId<CustomerEntity>): Promise<CustomerEntity>;
  abstract updateCustomer(id: string, customer: WithoutId<CustomerEntity>): Promise<CustomerEntity>;
  abstract deleteCustomer(id: string): Promise<void>;
}
