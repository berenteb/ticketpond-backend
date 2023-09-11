import { Module } from '@nestjs/common';
import { CustomerServiceInterface } from '../types/service-interfaces/customer.service.interface';
import { CustomerController } from './customer.controller';
import { InMemoryCustomerService } from './in-memory-customer.service';

@Module({
  providers: [{ provide: CustomerServiceInterface, useClass: InMemoryCustomerService }],
  controllers: [CustomerController],
})
export class CustomerModule {}
