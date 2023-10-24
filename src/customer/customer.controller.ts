import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse } from '@nestjs/swagger';
import { ReqWithUser } from '../types/common.types';
import { CreateCustomerDto, CustomerDto } from '../types/dtos/customer.dto';
import { CustomerServiceInterface } from '../types/service-interfaces/customer.service.interface';

@UseGuards(AuthGuard('jwt'))
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerServiceInterface) {}

  @Get('me')
  @ApiOkResponse({ type: CustomerDto })
  async getMe(@Req() req: any): Promise<CustomerDto> {
    return await this.customerService.getCustomerById(req.user.sub);
  }

  @Post('register')
  @ApiOkResponse({ type: CustomerDto })
  async registerCustomer(@Body() customer: CreateCustomerDto, @Req() req: ReqWithUser): Promise<CustomerDto> {
    const id = req.user.sub;
    if (!id) throw new UnauthorizedException();
    return this.customerService.createCustomer(customer, id);
  }
}
