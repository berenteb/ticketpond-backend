import { Module } from '@nestjs/common';
import { AssetModule } from '../asset/asset.module';
import { MerchantModule } from '../merchant/merchant.module';
import { PrismaService } from '../prisma/prisma.service';
import { ExperienceServiceInterface } from '../types/service-interfaces/experience.service.interface';
import { ExperienceAdminController } from './experience-admin.controller';
import { ExperienceMerchantController } from './experience-merchant.controller';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';

@Module({
  imports: [AssetModule, MerchantModule],
  providers: [{ provide: ExperienceServiceInterface, useClass: ExperienceService }, PrismaService],
  controllers: [ExperienceController, ExperienceAdminController, ExperienceMerchantController],
  exports: [{ provide: ExperienceServiceInterface, useClass: ExperienceService }],
})
export class ExperienceModule {}
