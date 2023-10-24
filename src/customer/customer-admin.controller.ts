import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { PermissionGuard } from '../authz/admin.guard';
import { CreateCustomerDto, CustomerDto, UpdateCustomerDto } from '../types/dtos/customer.dto';
import { Permissions } from '../types/jwt.types';
import { CustomerServiceInterface } from '../types/service-interfaces/customer.service.interface';

@UseGuards(AuthGuard('jwt'))
@UseGuards(PermissionGuard(Permissions.ADMIN))
@Controller('customer')
export class CustomerAdminController {
  constructor(private readonly customerService: CustomerServiceInterface) {}

  @Get()
  @ApiOkResponse({ type: [CustomerDto] })
  async getCustomers(): Promise<CustomerDto[]> {
    return this.customerService.getCustomers();
  }

  @UseGuards(PermissionGuard(Permissions.ADMIN))
  @Get(':id')
  @ApiOkResponse({ type: CustomerDto })
  @ApiNotFoundResponse()
  async getCustomer(@Param('id') id: string): Promise<CustomerDto> {
    return this.customerService.getCustomerById(id);
  }

  @Post()
  @ApiOkResponse({ type: CustomerDto })
  async createCustomer(@Body() customer: CreateCustomerDto): Promise<CustomerDto> {
    return this.customerService.createCustomer(customer);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CustomerDto })
  async updateCustomer(@Param('id') id: string, @Body() customer: UpdateCustomerDto): Promise<CustomerDto> {
    return this.customerService.updateCustomer(id, customer);
  }

  @Delete(':id')
  @ApiOkResponse()
  async deleteCustomer(@Param('id') id: string): Promise<void> {
    return this.customerService.deleteCustomer(id);
  }
}
