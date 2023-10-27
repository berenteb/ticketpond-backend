import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { PassServiceInterface } from '../types/service-interfaces/pass.service.interface';

@Controller('pass')
export class PassController {
  constructor(private readonly passService: PassServiceInterface) {}
  @Get('qr/:id')
  async getQrcode(@Param('id') id: string, @Res() res: Response) {
    const qr = await this.passService.getQrcode(id);
    res.type('png');
    res.send(qr);
  }
}
