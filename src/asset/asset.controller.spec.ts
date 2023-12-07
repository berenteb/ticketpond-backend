import { Test, TestingModule } from '@nestjs/testing';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { AssetServiceInterface } from '../types/service-interfaces/asset.service.interface';
import { AssetController } from './asset.controller';

const mockUploadFile = jest.fn();
const mockDeleteFile = jest.fn();

class MockAssetService implements AssetServiceInterface {
  deleteFile(fileName: string): Promise<void> {
    mockDeleteFile(fileName);
    return Promise.resolve(undefined);
  }

  uploadFile(file: any): Promise<string> {
    mockUploadFile(file);
    return Promise.resolve('');
  }
}

let controller: AssetController;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    imports: [NestjsFormDataModule],
    providers: [
      {
        provide: AssetServiceInterface,
        useClass: MockAssetService,
      },
    ],
    controllers: [AssetController],
  }).compile();

  controller = module.get<AssetController>(AssetController);
});

it('should call uploadFile on service', async () => {
  const file = {} as MemoryStoredFile;
  await controller.uploadFile({ file });
  expect(mockUploadFile).toHaveBeenCalledWith(file);
});
