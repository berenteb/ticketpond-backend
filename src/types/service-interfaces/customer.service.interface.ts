import { Customer } from '@prisma/client';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

export abstract class CustomerServiceInterface {
  abstract getCustomers(): Promise<Customer[]>;
  abstract getCustomerById(id: string): Promise<Customer>;
  abstract createCustomer(customer: CreateCustomerDto): Promise<Customer>;
  abstract updateCustomer(id: string, customer: UpdateCustomerDto): Promise<Customer>;
  abstract deleteCustomer(id: string): Promise<void>;
}
