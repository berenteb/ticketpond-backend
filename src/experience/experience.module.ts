import { Module } from '@nestjs/common';
import { MerchantService } from '../merchant/merchant.service';
import { PrismaService } from '../prisma/prisma.service';
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
    PrismaService,
  ],
  controllers: [ExperienceController, ExperienceAdminController, ExperienceMerchantController],
})
export class ExperienceModule {}
