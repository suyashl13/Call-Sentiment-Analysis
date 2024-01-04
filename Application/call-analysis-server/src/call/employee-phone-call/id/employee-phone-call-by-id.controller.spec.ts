import { Test, TestingModule } from '@nestjs/testing';
import { EmployeePhoneCallByIdController } from './employee-phone-call-by-id.controller';

describe('EmployeePhoneCallByIdController', () => {
  let controller: EmployeePhoneCallByIdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeePhoneCallByIdController],
    }).compile();

    controller = module.get<EmployeePhoneCallByIdController>(EmployeePhoneCallByIdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
