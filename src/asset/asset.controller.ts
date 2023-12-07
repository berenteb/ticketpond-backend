import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';
import { FormDataTestDto } from '../types/dtos/asset.dto';
import { AssetServiceInterface } from '../types/service-interfaces/asset.service.interface';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetServiceInterface) {}

  @Post('upload')
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({ type: String })
  async uploadFile(@Body() testDto: FormDataTestDto): Promise<string> {
    return await this.assetService.uploadFile(testDto.file);
  }
}
