import { Module } from '@nestjs/common';
import { CustomerServiceInterface } from '../types/service-interfaces/customer.service.interface';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  providers: [{ provide: CustomerServiceInterface, useClass: CustomerService }],
  controllers: [CustomerController],
})
export class CustomerModule {}
