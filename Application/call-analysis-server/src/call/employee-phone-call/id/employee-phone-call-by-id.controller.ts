import { Controller, Get, Param } from '@nestjs/common';

@Controller('employee/phone-call/:id')
export class EmployeePhoneCallByIdController {
    @Get()
    getPhoneCallById(@Param('id') id: string) {
        return {id};
    }
}
