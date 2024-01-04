import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../user.service";
import { AuthService } from "../auth/auth.service";
import { User as ApplicationUser } from "src/common/types";

declare global {
    namespace Express {
        interface Request {
            currentUser?: ApplicationUser | null
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    
    constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const accessToken: string = req.cookies['access_token'];

        if (accessToken) {
            const googleUser = await this.authService.getProfile(accessToken);
            const user = await this.userService.findByEmail(googleUser.data.email);
            req.currentUser = user;
            next();
        } else {
            req.currentUser = null;
            next();
        }
    }
}