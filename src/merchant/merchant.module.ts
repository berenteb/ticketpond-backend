import { Module } from '@nestjs/common';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';

@Module({
  providers: [{ provide: MerchantServiceInterface, useClass: MerchantService }],
  controllers: [MerchantController],
})
export class MerchantModule {}
