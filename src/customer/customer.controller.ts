import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { CreateCustomerDto, UpdateCustomerDto } from '../types/dtos/customer.dto';
import { CustomerServiceInterface } from '../types/service-interfaces/customer.service.interface';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerServiceInterface) {}

  @Get()
  async getCustomers(): Promise<Customer[]> {
    return this.customerService.getCustomers();
  }

  @Get(':id')
  async getCustomer(@Param('id') id: string): Promise<Customer> {
    return this.customerService.getCustomerById(id);
  }

  @Post()
  async createCustomer(@Body() customer: CreateCustomerDto): Promise<Customer> {
    return this.customerService.createCustomer(customer);
  }

  @Patch(':id')
  async updateCustomer(@Param('id') id: string, @Body() customer: UpdateCustomerDto): Promise<Customer> {
    return this.customerService.updateCustomer(id, customer);
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: string): Promise<void> {
    return this.customerService.deleteCustomer(id);
  }
}
