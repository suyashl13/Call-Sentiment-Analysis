import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeCallController } from './employee-call.controller';

describe('EmployeeCallController', () => {
  let controller: EmployeeCallController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeCallController],
    }).compile();

    controller = module.get<EmployeeCallController>(EmployeeCallController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
