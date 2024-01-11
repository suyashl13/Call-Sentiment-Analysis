import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeUserController } from './employee-user.controller';

describe('EmployeeUserController', () => {
  let controller: EmployeeUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeUserController],
    }).compile();

    controller = module.get<EmployeeUserController>(EmployeeUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
