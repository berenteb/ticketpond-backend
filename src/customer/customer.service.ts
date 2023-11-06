import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../types/dtos/customer.dto';
import { CustomerServiceInterface } from '../types/service-interfaces/customer.service.interface';
import { NotificationServiceInterface } from '../types/service-interfaces/notification.service.interface';

@Injectable()
export class CustomerService extends CustomerServiceInterface {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly notificationService: NotificationServiceInterface
  ) {
    super();
  }

  async createCustomer(customer: CreateCustomerDto, id?: string): Promise<Customer> {
    const created = await this.prismaService.customer.create({ data: { ...customer, id } });
    Logger.debug(`Created customer with id ${created.id}`, CustomerService.name);
    this.notificationService.sendWelcome(created);
    return created;
  }

  async deleteCustomer(id: string): Promise<void> {
    await this.prismaService.customer.delete({ where: { id } });
    Logger.debug(`Deleted customer with id ${id}`, CustomerService.name);
  }

  async getCustomerById(id: string): Promise<Customer> {
    const customer = await this.prismaService.customer.findUnique({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    Logger.debug(`Found customer with id ${id}`, CustomerService.name);
    return customer;
  }

  async getCustomers(): Promise<Customer[]> {
    const customers = await this.prismaService.customer.findMany();
    Logger.debug(`Found ${customers.length} customers`, CustomerService.name);
    return customers;
  }

  async updateCustomer(id: string, customer: UpdateCustomerDto): Promise<Customer> {
    const updatedCustomer = await this.prismaService.customer.update({ where: { id }, data: customer });
    Logger.debug(`Updated customer with id ${id}`, CustomerService.name);
    return updatedCustomer;
  }
}
