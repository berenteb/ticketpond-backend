import { Injectable, Logger } from '@nestjs/common';
import { WithoutId } from '../types/common.types';
import { MerchantEntity } from '../types/entities/merchant.entity';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';

@Injectable()
export class InMemoryMerchantService extends MerchantServiceInterface {
  private merchants: MerchantEntity[] = [];
  private idCounter = 0;

  async createMerchant(merchant: WithoutId<MerchantEntity>): Promise<MerchantEntity> {
    const newMerchant = {
      ...merchant,
      id: String(this.idCounter++),
    };
    this.merchants.push(newMerchant);
    Logger.log(`Created merchant: ${newMerchant}`, InMemoryMerchantService.name);
    return newMerchant;
  }

  async deleteMerchant(id: string): Promise<void> {
    this.merchants = this.merchants.filter((merchant) => merchant.id !== id);
    Logger.log(`Deleted merchant with id: ${id}`, InMemoryMerchantService.name);
  }

  async getMerchantById(id: string): Promise<MerchantEntity> {
    return this.merchants.find((merchant) => merchant.id === id);
  }

  async getMerchants(): Promise<MerchantEntity[]> {
    return this.merchants;
  }

  async updateMerchant(id: string, merchant: WithoutId<MerchantEntity>): Promise<MerchantEntity> {
    const updatedMerchant = {
      ...merchant,
      id,
    };
    this.merchants = this.merchants.map((merchant) => (merchant.id === id ? updatedMerchant : merchant));
    Logger.log(`Updated merchant: ${updatedMerchant}`, InMemoryMerchantService.name);
    return updatedMerchant;
  }
}
