import { Module } from '@nestjs/common';
import { AdminPhoneCallController } from './admin-phone-call/admin-phone-call.controller';
import { EmployeePhoneCallController } from './employee-phone-call/employee-phone-call.controller';
import { CallService } from './call.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneCall } from './entities/phone-call.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PhoneCall
    ])
  ],
  controllers: [AdminPhoneCallController, EmployeePhoneCallController],
  providers: [CallService]
})
export class CallModule {}
