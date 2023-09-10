import { Identifiable } from '../common.types';

export type MerchantEntity = {
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
} & Identifiable;
