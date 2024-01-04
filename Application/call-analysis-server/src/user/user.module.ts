import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { GoogleAuthService } from "./auth/google-auth.service";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { CurrentUserMiddleware } from "./middlewares/current-user.middleware";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleAuthService, UserService],
  exports: [AuthService, UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes("*");
  }
}
