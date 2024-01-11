import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { GoogleAuthService } from "./auth/google-auth.service";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { CurrentUserMiddleware } from "./middlewares/current-user.middleware";
import { JwtModule } from "@nestjs/jwt";
import { AdminUserService } from './admin-user/admin-user.service';
import { EmployeeUserService } from './employee-user/employee-user.service';
import { AdminUserController } from './admin-user/admin-user.controller';
import { EmployeeUserController } from './employee-user/employee-user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AuthController, AdminUserController, EmployeeUserController],
  providers: [AuthService, GoogleAuthService, UserService, AdminUserService, EmployeeUserService],
  exports: [AuthService, UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes("*");
  }
}
