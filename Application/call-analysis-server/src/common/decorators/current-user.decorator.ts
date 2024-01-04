import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    function (data: never, context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        return request.currentUser;
    }
)