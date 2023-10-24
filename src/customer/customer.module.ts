import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CustomerServiceInterface } from '../types/service-interfaces/customer.service.interface';
import { CustomerAdminController } from './customer-admin.controller';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  providers: [{ provide: CustomerServiceInterface, useClass: CustomerService }, PrismaService],
  controllers: [CustomerController, CustomerAdminController],
})
export class CustomerModule {}
