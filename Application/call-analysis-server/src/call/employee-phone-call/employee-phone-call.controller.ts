import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CallService } from "../call.service";
import { CreatePhoneCallDto } from "../dtos/create-phone-call.dto";
import { AuthenticationGuard } from "src/common/guards/authentication.guard";
import { CheckTokenExpiryGuard } from "src/common/guards/check-token-expiry.guard";
import { AuthorizationGuard } from "src/common/guards/authorization.guard";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { User } from "src/common/types";

@Controller("employee-phone-call")
@UseGuards(AuthenticationGuard, CheckTokenExpiryGuard)
@UseGuards(new AuthorizationGuard(1))
export class EmployeePhoneCallController {
  constructor(private callService: CallService) {}

  @Post()
  async createPhoneCall(
    @Body() phoneCall: CreatePhoneCallDto,
    @CurrentUser() user: User
  ) {
    return this.callService.createPhoneCall(
      phoneCall,
      user.id
    );
  }
  
  @Get()
  async getPhoneCalls(@CurrentUser() currentUser: User) {
    return this.callService.getPhoneCallsByUserId(currentUser.id);
  }
}
