import { Injectable, Logger } from '@nestjs/common';
import { DeepOrderDto } from '../types/dtos/order.dto';
import { PassServiceInterface } from '../types/service-interfaces/pass.service.interface';
import { AppleService } from './apple.service';

import { toBuffer } from 'qrcode';

@Injectable()
export class PassService implements PassServiceInterface {
  constructor(private readonly appleService: AppleService) {}
  async generatePasses(order: DeepOrderDto) {
    try {
      order.items.forEach((item) => this.appleService.generatePass(item));
    } catch (e) {
      Logger.error(e);
    }
  }

  async getQrcode(text: string, scale = 10) {
    return await toBuffer(text, { scale });
  }
}
