import { Test, TestingModule } from '@nestjs/testing';
import { TicketAdminController } from './ticket-admin.controller';

describe('TicketAdminController', () => {
  let controller: TicketAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketAdminController],
    }).compile();

    controller = module.get<TicketAdminController>(TicketAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
