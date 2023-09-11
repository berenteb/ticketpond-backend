import { Injectable } from '@nestjs/common';
import { WithoutId } from '../types/common.types';
import { MerchantEntity } from '../types/entities/merchant.entity';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';

@Injectable()
export class InMemoryMerchantService extends MerchantServiceInterface {
  private merchants: MerchantEntity[] = [];
  private idCounter = 0;

  createMerchant(merchant: WithoutId<MerchantEntity>): Promise<MerchantEntity> {
    const newMerchant = {
      ...merchant,
      id: String(this.idCounter++),
    };
    this.merchants.push(newMerchant);
    return Promise.resolve(newMerchant);
  }

  deleteMerchant(id: string): Promise<void> {
    this.merchants = this.merchants.filter((merchant) => merchant.id !== id);
    return Promise.resolve();
  }

  getMerchantById(id: string): Promise<MerchantEntity> {
    return Promise.resolve(this.merchants.find((merchant) => merchant.id === id));
  }

  getMerchants(): Promise<MerchantEntity[]> {
    return Promise.resolve(this.merchants);
  }

  updateMerchant(id: string, merchant: WithoutId<MerchantEntity>): Promise<MerchantEntity> {
    const updatedMerchant = {
      ...merchant,
      id,
    };
    this.merchants = this.merchants.map((merchant) => (merchant.id === id ? updatedMerchant : merchant));
    return Promise.resolve(updatedMerchant);
  }
}
