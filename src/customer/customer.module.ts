import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CustomerServiceInterface } from '../types/service-interfaces/customer.service.interface';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  providers: [{ provide: CustomerServiceInterface, useClass: CustomerService }, PrismaService],
  controllers: [CustomerController],
})
export class CustomerModule {}
