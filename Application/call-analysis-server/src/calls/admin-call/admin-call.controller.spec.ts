import { Test, TestingModule } from '@nestjs/testing';
import { AdminCallController } from './admin-call.controller';

describe('AdminCallController', () => {
  let controller: AdminCallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminCallController],
    }).compile();

    controller = module.get<AdminCallController>(AdminCallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
