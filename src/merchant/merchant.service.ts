import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Merchant } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMerchantDto, UpdateMerchantDto } from '../types/dtos/merchant.dto';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';

@Injectable()
export class MerchantService implements MerchantServiceInterface {
  constructor(private readonly prisma: PrismaService) {}

  async createMerchant(merchant: CreateMerchantDto): Promise<Merchant> {
    const created = await this.prisma.merchant.create({ data: merchant });
    Logger.debug(`Created merchant with id ${created.id}`);
    return created;
  }

  async getMerchantById(id: string): Promise<Merchant> {
    const merchant = await this.prisma.merchant.findUnique({ where: { id } });
    if (!merchant) {
      throw new NotFoundException(`Merchant with id ${id} not found`);
    }
    Logger.debug(`Found merchant with id ${id}`);
    return merchant;
  }

  async getMerchants(): Promise<Merchant[]> {
    const merchants = await this.prisma.merchant.findMany();
    Logger.debug(`Found ${merchants.length} merchants`);
    return merchants;
  }

  async updateMerchant(id: string, merchant: UpdateMerchantDto): Promise<Merchant> {
    const updated = await this.prisma.merchant.update({ where: { id }, data: merchant });
    Logger.debug(`Updated merchant with id ${id}`);
    return updated;
  }

  async deleteMerchant(id: string): Promise<void> {
    await this.prisma.merchant.delete({ where: { id } });
    Logger.debug(`Deleted merchant with id ${id}`);
  }
}
