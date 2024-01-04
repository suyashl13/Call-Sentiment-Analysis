import { Module } from '@nestjs/common';
import { AdminPhoneCallController } from './admin-phone-call/admin-phone-call.controller';
import { EmployeePhoneCallController } from './employee-phone-call/employee-phone-call.controller';
import { CallService } from './call.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneCall } from './entities/phone-call.entity';
import { UserModule } from 'src/user/user.module';
import { EmployeePhoneCallByIdController } from './employee-phone-call/id/employee-phone-call-by-id.controller';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([
      PhoneCall
    ])
  ],
  controllers: [AdminPhoneCallController, EmployeePhoneCallController, EmployeePhoneCallByIdController],
  providers: [CallService]
})
export class CallModule {}
