import { CreateCustomerDto, CustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

export abstract class CustomerServiceInterface {
  abstract getCustomers(): Promise<CustomerDto[]>;

  abstract getCustomerById(id: string): Promise<CustomerDto>;

  abstract createCustomer(customer: CreateCustomerDto): Promise<CustomerDto>;

  abstract updateCustomer(id: string, customer: UpdateCustomerDto): Promise<CustomerDto>;
  abstract deleteCustomer(id: string): Promise<void>;
}
