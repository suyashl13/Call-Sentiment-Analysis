import { Body, Controller, Post } from '@nestjs/common';
import { CallService } from '../call.service';
import { CreatePhoneCallDto } from '../dtos/create-phone-call.dto';

@Controller('employee-phone-call')
export class EmployeePhoneCallController {
    constructor(private callService: CallService) {}

    @Post()
    async createPhoneCall(@Body() phoneCall: CreatePhoneCallDto, userId: string) {
        return this.callService.createPhoneCall(phoneCall, '73447c7e-39b2-4d91-a47f-a0fb524b9069');
    }
}
