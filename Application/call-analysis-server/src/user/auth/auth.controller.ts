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
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { User } from "src/common/types";
import { UserService } from "../user.service";
import { JwtService } from "@nestjs/jwt";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService, private readonly jwtService: JwtService) {}

  @Get("redirect")
  redirectToGoogleAuth(@Req() req: ExpressRequest, @Res() res: Response) {
    res.redirect("http://localhost:3000/auth/google");
  }

  @Get("google")
  @UseGuards(AuthGuard("google"))
  googleLogin() {}

  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleLoginCallback(@Request() req: any, @Res() res: Response) {
    const googleToken = req.user.accessToken;
    const googleRefreshToken = req.user.refreshToken;

    const user = await this.userService.findByEmail(req.user.email);
    const encryptedJwtUser = this.jwtService.sign({ user: user }, { secret: process.env.JWT_SECRET, expiresIn: "365d" });

    res.cookie("access_token", googleToken, { httpOnly: true });
    res.cookie("refresh_token", googleRefreshToken, {
      httpOnly: true,
    });
    res.cookie("jwt", encryptedJwtUser, { httpOnly: false });

    if (req.user.role === 0) {
      res.redirect("http://localhost:3300/admin");
    } else if (req.user.role === 1) {
      res.redirect("http://localhost:3300/employee");
    }
  }

  @UseGuards(CheckTokenExpiryGuard)
  @Get("profile")
  async getProfile(@Request() req: any, @CurrentUser() user: User) {
    const accessToken = req.cookies["access_token"];
    if (accessToken)
      return user;
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
