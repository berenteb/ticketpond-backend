import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { WithoutId } from '../types/common.types';
import { CustomerEntity } from '../types/entities/customer.entity';
import { CustomerServiceInterface } from '../types/service-interfaces/customer.service.interface';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerServiceInterface) {}

  @Get()
  getCustomers() {
    return this.customerService.getCustomers();
  }

  @Get(':id')
  getCustomer(@Param('id') id: string) {
    return this.customerService.getCustomerById(id);
  }

  @Post()
  createCustomer(@Body() customer: WithoutId<CustomerEntity>) {
    return this.customerService.createCustomer(customer);
  }

  @Patch(':id')
  updateCustomer(@Param('id') id: string, @Body() customer: CustomerEntity) {
    return this.customerService.updateCustomer(id, customer);
  }

  @Delete(':id')
  deleteCustomer(@Param('id') id: string) {
    return this.customerService.deleteCustomer(id);
  }
}
