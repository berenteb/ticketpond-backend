import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { MemoryStoredFile } from 'nestjs-form-data';
import * as path from 'path';
import { AssetServiceInterface } from '../types/service-interfaces/asset.service.interface';
import { generateRandomString } from '../util/generators.util';

const pathName = path.resolve(__dirname, '../../../static/uploads');

@Injectable()
export class AssetService implements AssetServiceInterface {
  deleteFile(fileName: string): Promise<void> {
    return fs.promises.rm(path.resolve(pathName, fileName));
  }

  async uploadFile(file: MemoryStoredFile): Promise<string> {
    const fileName = generateRandomString(16);
    const fullName = `${fileName}.${file.extensionWithSource.value}`;
    await fs.promises.writeFile(path.resolve(pathName, fullName), file.buffer);
    return fullName;
  }
}
