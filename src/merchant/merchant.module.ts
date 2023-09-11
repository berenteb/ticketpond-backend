import { Module } from '@nestjs/common';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';
import { InMemoryMerchantService } from './in-memory-merchant.service';
import { MerchantController } from './merchant.controller';

@Module({
  providers: [{ provide: MerchantServiceInterface, useClass: InMemoryMerchantService }],
  controllers: [MerchantController],
})
export class MerchantModule {}
