import { Module } from '@nestjs/common';
import { CallsService } from './calls.service';
import { EmployeeCallController } from './employee-call/employee-call.controller';
import { AdminCallController } from './admin-call/admin-call.controller';

@Module({
  providers: [CallsService],
  controllers: [EmployeeCallController, AdminCallController]
})
export class CallsModule {}
