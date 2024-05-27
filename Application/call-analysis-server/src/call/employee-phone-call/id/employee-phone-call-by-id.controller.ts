import { Controller, Get, Param } from '@nestjs/common';
import { CallService } from 'src/call/call.service';

@Controller('employee/phone-call/:id')
export class EmployeePhoneCallByIdController {

    constructor(private readonly callService: CallService) {}

    @Get()
    getPhoneCallById(@Param('id') id: string) {
        return this.callService.getPhoneCallsByUserIdWithoutPagging(id);
    }
}
