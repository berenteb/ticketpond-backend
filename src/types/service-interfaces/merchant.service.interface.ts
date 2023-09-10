import { WithoutId } from '../common.types';
import { MerchantEntity } from '../entities/merchant.entity';

export abstract class MerchantServiceInterface {
  abstract getMerchants(): Promise<MerchantEntity[]>;
  abstract getMerchantById(id: string): Promise<MerchantEntity>;
  abstract createMerchant(merchant: WithoutId<MerchantEntity>): Promise<MerchantEntity>;
  abstract updateMerchant(id: string, merchant: WithoutId<MerchantEntity>): Promise<MerchantEntity>;
  abstract deleteMerchant(id: string): Promise<void>;
}
