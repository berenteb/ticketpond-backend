import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ReqWithUser } from '../types/common.types';
import { CreateCustomerDto, CustomerDto, UpdateCustomerDto } from '../types/dtos/customer.dto';
import { CustomerServiceInterface } from '../types/service-interfaces/customer.service.interface';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerServiceInterface) {}

  @Get()
  @ApiOkResponse({ type: [CustomerDto] })
  async getCustomers(): Promise<CustomerDto[]> {
    return this.customerService.getCustomers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  @ApiOkResponse({ type: CustomerDto })
  async getMe(@Req() req: any): Promise<CustomerDto> {
    return await this.customerService.getCustomerById(req.user.sub);
  }

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

  @UseGuards(AuthGuard('jwt'))
  @Post('register')
  @ApiOkResponse({ type: CustomerDto })
  async registerCustomer(@Body() customer: CreateCustomerDto, @Req() req: ReqWithUser): Promise<CustomerDto> {
    const id = req.user.sub;
    if (!id) throw new UnauthorizedException();
    return this.customerService.createCustomer(customer, id);
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
