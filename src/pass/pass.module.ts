import { Module } from '@nestjs/common';
import { PassServiceInterface } from '../types/service-interfaces/pass.service.interface';
import { AppleService } from './apple.service';
import { PassService } from './pass.service';
import { PassController } from './pass.controller';

@Module({
  providers: [{ provide: PassServiceInterface, useClass: PassService }, AppleService],
  controllers: [PassController],
})
export class PassModule {}
