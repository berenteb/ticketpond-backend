import { Injectable } from '@nestjs/common';
import { WithoutId } from '../types/common.types';
import { MerchantEntity } from '../types/entities/merchant.entity';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';

@Injectable()
export class MerchantService extends MerchantServiceInterface {
  createMerchant(merchant: WithoutId<MerchantEntity>): Promise<MerchantEntity> {
    return Promise.resolve(undefined);
  }

  deleteMerchant(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  getMerchantById(id: string): Promise<MerchantEntity> {
    return Promise.resolve(undefined);
  }

  getMerchants(): Promise<MerchantEntity[]> {
    return Promise.resolve([]);
  }

  updateMerchant(id: string, merchant: WithoutId<MerchantEntity>): Promise<MerchantEntity> {
    return Promise.resolve(undefined);
  }
}
