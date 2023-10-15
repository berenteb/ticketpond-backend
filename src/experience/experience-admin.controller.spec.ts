import { Test, TestingModule } from '@nestjs/testing';
import { ExperienceAdminController } from './experience-admin.controller';

describe('ExperienceAdminController', () => {
  let controller: ExperienceAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExperienceAdminController],
    }).compile();

    controller = module.get<ExperienceAdminController>(ExperienceAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
