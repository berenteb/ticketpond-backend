import { CreateMerchantDto, MerchantDto, UpdateMerchantDto } from '../dtos/merchant.dto';

export abstract class MerchantServiceInterface {
  abstract getMerchants(): Promise<MerchantDto[]>;

  abstract getMerchantById(id: string): Promise<MerchantDto>;
  abstract getMerchantByUserId(id: string): Promise<MerchantDto>;

  abstract createMerchant(merchant: CreateMerchantDto): Promise<MerchantDto>;
  abstract assignCustomerToMerchant(merchantId: string, customerId: string): Promise<void>;

  abstract updateMerchant(id: string, merchant: UpdateMerchantDto): Promise<MerchantDto>;
  abstract deleteMerchant(id: string): Promise<void>;
}
