import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import { MemoryStoredFile } from 'nestjs-form-data';
import * as path from 'path';
import { AssetService } from './asset.service';

let service: AssetService;

const pathName = path.resolve(__dirname, '../../../static/uploads');

jest.mock('fs', () => ({
  promises: {
    rm: jest.fn(),
    writeFile: jest.fn(),
  },
}));

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [AssetService],
  }).compile();

  service = module.get<AssetService>(AssetService);
});

it('should call delete fs rm', () => {
  service.deleteFile('test');
  expect(fs.promises.rm).toBeCalledWith(path.resolve(pathName, 'test'));
});

it('should call writeFile with random generated fileName, and return file name', async () => {
  const fileName = await service.uploadFile({
    extensionWithSource: {
      value: 'png',
    },
    buffer: Buffer.from('test'),
  } as unknown as MemoryStoredFile);
  expect(fs.promises.writeFile).toBeCalledWith(expect.any(String), expect.anything());
  expect(fileName).toMatch(/[0-9A-Z]{16}\.png/);
});
