import { Test, TestingModule } from '@nestjs/testing';
import { AdminPhoneCallController } from './admin-phone-call.controller';

describe('AdminPhoneCallController', () => {
  let controller: AdminPhoneCallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminPhoneCallController],
    }).compile();

    controller = module.get<AdminPhoneCallController>(AdminPhoneCallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
