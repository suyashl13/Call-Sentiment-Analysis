import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/guards/authentication.guard';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { CheckTokenExpiryGuard } from 'src/common/guards/check-token-expiry.guard';
import { CallService } from '../call.service';

@UseGuards(AuthenticationGuard, CheckTokenExpiryGuard)
@UseGuards(new AuthorizationGuard(0))
@Controller('admin/phone-call')
export class AdminPhoneCallController {

    constructor(private readonly callService: CallService) {
    }
}
