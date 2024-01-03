import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/user.entity";
import { CallModule } from './call/call.module';
import { PhoneCall } from "./call/entities/phone-call.entity";

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: "sqlite",
          database: config.get<string>("DB_NAME"),
          entities: [User, PhoneCall],
          synchronize: true,
        }
      }
    }),
    CallModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
