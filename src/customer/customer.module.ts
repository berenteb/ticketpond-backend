import { Module } from '@nestjs/common';
import { NotificationModule } from '../notification/notification.module';
import { PrismaService } from '../prisma/prisma.service';
import { CustomerServiceInterface } from '../types/service-interfaces/customer.service.interface';
import { CustomerAdminController } from './customer-admin.controller';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [NotificationModule],
  providers: [{ provide: CustomerServiceInterface, useClass: CustomerService }, PrismaService],
  controllers: [CustomerController, CustomerAdminController],
})
export class CustomerModule {}
