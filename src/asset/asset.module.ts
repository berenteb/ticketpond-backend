import { Module } from '@nestjs/common';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { AssetServiceInterface } from '../types/service-interfaces/asset.service.interface';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';

@Module({
  imports: [NestjsFormDataModule],
  providers: [{ provide: AssetServiceInterface, useClass: AssetService }],
  controllers: [AssetController],
})
export class AssetModule {}
