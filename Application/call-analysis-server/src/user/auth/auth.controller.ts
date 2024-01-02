import {
  Controller,
  Get,
  UseGuards,
  Request,
  Res,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Request as ExpressRequest, Response } from "express";
import { AuthService } from "./auth.service";
import { CheckTokenExpiryGuard } from "../../common/guards/check-token-expiry.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("redirect")
  redirectToGoogleAuth(@Req() req: ExpressRequest, @Res() res: Response) {
    res.redirect("http://localhost:3000/auth/google");
  }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  googleLogin() {}

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  googleLoginCallback(@Request() req: any, @Res() res: Response) {
    const googleToken = req.user.accessToken;
    const googleRefreshToken = req.user.refreshToken;

    res.cookie("access_token", googleToken, { httpOnly: true });
    res.cookie("refresh_token", googleRefreshToken, {
      httpOnly: true,
    });

    if (req.user.role === 0) {
      res.redirect("http://localhost:3300/admin");
    } else if (req.user.role === 1) {
      res.redirect("http://localhost:3300/employee");
    }
  }

  @UseGuards(CheckTokenExpiryGuard)
  @Get("profile")
  async getProfile(@Request() req) {
    const accessToken = req.cookies["access_token"];
    if (accessToken)
      return (await this.authService.getProfile(accessToken)).data;
    throw new UnauthorizedException("No access token");
  }

  @Get("logout")
  logout(@Req() req: ExpressRequest, @Res() res: Response) {
    const refreshToken = req.cookies["refresh_token"];
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    this.authService.revokeGoogleToken(refreshToken);
    res.redirect("http://localhost:3000/");
  }
}
