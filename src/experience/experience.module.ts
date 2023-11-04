import { Module } from '@nestjs/common';
import { AssetService } from '../asset/asset.service';
import { MerchantService } from '../merchant/merchant.service';
import { PrismaService } from '../prisma/prisma.service';
import { AssetServiceInterface } from '../types/service-interfaces/asset.service.interface';
import { ExperienceServiceInterface } from '../types/service-interfaces/experience.service.interface';
import { MerchantServiceInterface } from '../types/service-interfaces/merchant.service.interface';
import { ExperienceAdminController } from './experience-admin.controller';
import { ExperienceMerchantController } from './experience-merchant.controller';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';

@Module({
  providers: [
    { provide: ExperienceServiceInterface, useClass: ExperienceService },
    { provide: MerchantServiceInterface, useClass: MerchantService },
    { provide: AssetServiceInterface, useClass: AssetService },
    PrismaService,
  ],
  controllers: [ExperienceController, ExperienceAdminController, ExperienceMerchantController],
})
export class ExperienceModule {}
