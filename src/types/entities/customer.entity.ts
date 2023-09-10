import { Identifiable } from '../common.types';

export type CustomerEntity = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
} & Identifiable;
