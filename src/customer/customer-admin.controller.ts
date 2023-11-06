import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { PermissionGuard } from '../authz/admin.guard';
import { CreateCustomerDto, CustomerDto, UpdateCustomerDto } from '../types/dtos/customer.dto';
import { Permissions } from '../types/jwt.types';
import { CustomerServiceInterface } from '../types/service-interfaces/customer.service.interface';

@UseGuards(PermissionGuard(Permissions.ADMIN))
@UseGuards(AuthGuard('jwt'))
@Controller('customer')
export class CustomerAdminController {
  constructor(private readonly customerService: CustomerServiceInterface) {}

  @Get()
  @ApiOkResponse({ type: [CustomerDto] })
  async getCustomers(): Promise<CustomerDto[]> {
    return this.customerService.getCustomers();
  }

  @UseGuards(PermissionGuard(Permissions.ADMIN))
  @Get(':internalId')
  @ApiOkResponse({ type: CustomerDto })
  @ApiNotFoundResponse()
  async getCustomerByInternalId(@Param('internalId') internalId: string): Promise<CustomerDto> {
    return this.customerService.getCustomerByInternalId(internalId);
  }

  @Post()
  @ApiOkResponse({ type: CustomerDto })
  async createCustomer(@Body() customer: CreateCustomerDto): Promise<CustomerDto> {
    return this.customerService.createCustomer(customer);
  }

  @Patch(':internalId')
  @ApiOkResponse({ type: CustomerDto })
  async updateCustomerByInternalId(
    @Param('internalId') internalId: string,
    @Body() customer: UpdateCustomerDto
  ): Promise<CustomerDto> {
    return this.customerService.updateCustomerByInternalId(internalId, customer);
  }

  @Delete(':internalId')
  @ApiOkResponse()
  async deleteCustomerByInternalId(@Param('internalId') internalId: string): Promise<void> {
    return this.customerService.deleteCustomer(internalId);
  }
}
