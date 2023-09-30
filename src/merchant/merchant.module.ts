import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';

@Module({
  providers: [{ provide: MerchantServiceInterface, useClass: MerchantService }, PrismaService],
  controllers: [MerchantController],
})
export class MerchantModule {}
