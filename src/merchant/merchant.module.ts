import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';
import { MerchantAdminController } from './merchant-admin.controller';
import { MerchantSelfController } from './merchant-self.controller';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';

@Module({
  providers: [{ provide: MerchantServiceInterface, useClass: MerchantService }, PrismaService],
  controllers: [MerchantController, MerchantAdminController, MerchantSelfController],
})
export class MerchantModule {}
