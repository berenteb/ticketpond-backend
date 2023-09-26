import { Injectable } from '@nestjs/common';
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
    return this.prismaService.customer.create({ data: customer });
  }

  async deleteCustomer(id: string): Promise<void> {
    this.prismaService.customer.delete({ where: { id } });
  }

  async getCustomerById(id: string): Promise<Customer> {
    return this.prismaService.customer.findUnique({ where: { id } });
  }

  async getCustomers(): Promise<Customer[]> {
    return this.prismaService.customer.findMany();
  }

  async updateCustomer(id: string, customer: UpdateCustomerDto): Promise<Customer> {
    return this.prismaService.customer.update({ where: { id }, data: customer });
  }
}
