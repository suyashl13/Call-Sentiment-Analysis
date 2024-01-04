import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { User } from "../types";

export class AuthorizationGuard implements CanActivate {

    constructor(private allowedRole: number) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const currentUser: User = request.currentUser;

        if (!currentUser) {
            return false;
        }

        return currentUser.role === this.allowedRole;
    }
}