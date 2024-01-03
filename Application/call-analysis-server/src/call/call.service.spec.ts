import { Test, TestingModule } from '@nestjs/testing';
import { CallService } from './call.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { PhoneCall } from './entities/phone-call.entity';

describe('CallService', () => {
  let service: CallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([PhoneCall, User]),
        UserModule
      ],
      providers: [CallService],
    }).compile();

    service = module.get<CallService>(CallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
