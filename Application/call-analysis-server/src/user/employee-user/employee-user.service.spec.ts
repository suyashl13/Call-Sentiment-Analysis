import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeUserService } from './employee-user.service';

describe('EmployeeUserService', () => {
  let service: EmployeeUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeUserService],
    }).compile();

    service = module.get<EmployeeUserService>(EmployeeUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
