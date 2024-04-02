import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CallService } from "../call.service";
import { CreatePhoneCallDto } from "../dtos/create-phone-call.dto";
import { AuthenticationGuard } from "src/common/guards/authentication.guard";
import { CheckTokenExpiryGuard } from "src/common/guards/check-token-expiry.guard";
import { AuthorizationGuard } from "src/common/guards/authorization.guard";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { User } from "src/common/types";
import { PageParamsDto } from "../../common/dtos/page-params.dto";
import { Request as ExpressRequest } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("employee/phone-call")
@UseGuards(AuthenticationGuard, CheckTokenExpiryGuard)
@UseGuards(new AuthorizationGuard(1))
export class EmployeePhoneCallController {
  constructor(private callService: CallService) {}

  @Post()
  @UseInterceptors(FileInterceptor("callRecordingUrl", {
    storage: diskStorage({
      destination: "./uploads",
      filename: (req, file, cb) => {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join("");
        return cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  async createPhoneCall(
    @Body() phoneCall: CreatePhoneCallDto,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: User
  ) {
    console.log(file, phoneCall);

    if (!user.isActive) {
      throw new UnauthorizedException("User is not active");
    }
    phoneCall.callRecordingUrl = file.path;
    const savedPhoneCall = await this.callService.createPhoneCall(
      phoneCall,
      user.id
    );
    return savedPhoneCall;
  }

  getFilteredPhoneCalls(
    @Query() params: PageParamsDto,
    @Request() req: ExpressRequest,
    @CurrentUser() currentUser: User
  ) {
    // TODO: Add filter
    return this.getPhoneCalls(currentUser, params, req);
  }

  @Get()
  async getPhoneCalls(
    @CurrentUser() currentUser: User,
    @Query() params: PageParamsDto,
    @Request() req: ExpressRequest
  ) {
    const offset: number = Number(params.offset);
    const limit: number = Number(params.limit);
    const data = await this.callService.getPhoneCallsByUserId(
      currentUser.id,
      offset,
      limit
    );
    const pages: number = Math.ceil(
      (await this.callService.getPhoneCallCountByUserId(currentUser.id)) /
        params.limit
    );

    return {
      success: true,
      paging: {
        previous:
          offset > 1
            ? `${req.protocol}://${req.hostname}${
                process.env.NODE_ENV !== "production"
                  ? ":" + req.socket.localPort
                  : ""
              }${req.baseUrl}${req.path}?offset=${offset - 1}&limit=${
                params.limit
              }`
            : null,
        next:
          offset <= pages - 1
            ? `${req.protocol}://${req.hostname}${
                process.env.NODE_ENV !== "production"
                  ? ":" + req.socket.localPort
                  : ""
              }${req.baseUrl}${req.path}?offset=${offset + 1}&limit=${
                params.limit
              }`
            : null,
        offset: offset,
        limit: limit,
        total: await this.callService.getPhoneCallCountByUserId(currentUser.id),
        pages: pages,
      },
      data: data,
    };
  }
}
