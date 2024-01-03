import { Test, TestingModule } from '@nestjs/testing';
import { EmployeePhoneCallController } from './employee-phone-call.controller';

describe('EmployeePhoneCallController', () => {
  let controller: EmployeePhoneCallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeePhoneCallController],
    }).compile();

    controller = module.get<EmployeePhoneCallController>(EmployeePhoneCallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
