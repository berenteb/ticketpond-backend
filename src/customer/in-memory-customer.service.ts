import { Injectable, Logger } from '@nestjs/common';
import { WithoutId } from '../types/common.types';
import { CustomerEntity } from '../types/entities/customer.entity';
import { CustomerServiceInterface } from '../types/service-interfaces/customer.service.interface';

@Injectable()
export class InMemoryCustomerService extends CustomerServiceInterface {
  private customers: CustomerEntity[] = [];
  private idCounter = 0;

  async createCustomer(customer: WithoutId<CustomerEntity>): Promise<CustomerEntity> {
    const newCustomer = {
      ...customer,
      id: String(this.idCounter++),
    };
    this.customers.push(newCustomer);
    Logger.debug(`Created customer: ${newCustomer}`, InMemoryCustomerService.name);
    return newCustomer;
  }

  async deleteCustomer(id: string): Promise<void> {
    this.customers = this.customers.filter((customer) => customer.id !== id);
    Logger.debug(`Deleted customer with id: ${id}`, InMemoryCustomerService.name);
  }

  async getCustomerById(id: string): Promise<CustomerEntity> {
    return this.customers.find((customer) => customer.id === id);
  }

  async getCustomers(): Promise<CustomerEntity[]> {
    return this.customers;
  }

  async updateCustomer(id: string, customer: WithoutId<CustomerEntity>): Promise<CustomerEntity> {
    const updatedCustomer = {
      ...customer,
      id,
    };
    this.customers = this.customers.map((customer) => (customer.id === id ? updatedCustomer : customer));
    Logger.debug(`Updated customer: ${updatedCustomer}`, InMemoryCustomerService.name);
    return updatedCustomer;
  }
}
