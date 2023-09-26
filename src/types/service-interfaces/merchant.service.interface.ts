import { Merchant } from '@prisma/client';
import { CreateMerchantDto, UpdateMerchantDto } from '../dtos/merchant.dto';

export abstract class MerchantServiceInterface {
  abstract getMerchants(): Promise<Merchant[]>;
  abstract getMerchantById(id: string): Promise<Merchant>;
  abstract createMerchant(merchant: CreateMerchantDto): Promise<Merchant>;
  abstract updateMerchant(id: string, merchant: UpdateMerchantDto): Promise<Merchant>;
  abstract deleteMerchant(id: string): Promise<void>;
}
