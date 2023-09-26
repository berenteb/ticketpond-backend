import { Injectable } from '@nestjs/common';
import { Merchant } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMerchantDto, UpdateMerchantDto } from '../types/dtos/merchant.dto';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';

@Injectable()
export class MerchantService extends MerchantServiceInterface {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async createMerchant(merchant: CreateMerchantDto): Promise<Merchant> {
    return this.prisma.merchant.create({ data: merchant });
  }

  async getMerchantById(id: string): Promise<Merchant> {
    return this.prisma.merchant.findUnique({ where: { id } });
  }

  async getMerchants(): Promise<Merchant[]> {
    return this.prisma.merchant.findMany();
  }

  async updateMerchant(id: string, merchant: UpdateMerchantDto): Promise<Merchant> {
    return this.prisma.merchant.update({ where: { id }, data: merchant });
  }

  async deleteMerchant(id: string): Promise<void> {
    this.prisma.merchant.delete({ where: { id } });
  }
}
