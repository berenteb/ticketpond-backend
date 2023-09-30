import { Injectable, Logger } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../types/dtos/customer.dto';
import { CustomerServiceInterface } from '../types/service-interfaces/customer.service.interface';

@Injectable()
export class CustomerService extends CustomerServiceInterface {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }
  async createCustomer(customer: CreateCustomerDto): Promise<Customer> {
    const created = await this.prismaService.customer.create({ data: customer });
    Logger.debug(`Created customer with id ${created.id}`);
    return created;
  }

  async deleteCustomer(id: string): Promise<void> {
    await this.prismaService.customer.delete({ where: { id } });
    Logger.debug(`Deleted customer with id ${id}`);
  }

  async getCustomerById(id: string): Promise<Customer> {
    const customer = await this.prismaService.customer.findUnique({ where: { id } });
    Logger.debug(`Found customer with id ${id}`);
    return customer;
  }

  async getCustomers(): Promise<Customer[]> {
    const customers = await this.prismaService.customer.findMany();
    Logger.debug(`Found ${customers.length} customers`);
    return customers;
  }

  async updateCustomer(id: string, customer: UpdateCustomerDto): Promise<Customer> {
    const updatedCustomer = await this.prismaService.customer.update({ where: { id }, data: customer });
    Logger.debug(`Updated customer with id ${id}`);
    return updatedCustomer;
  }
}
