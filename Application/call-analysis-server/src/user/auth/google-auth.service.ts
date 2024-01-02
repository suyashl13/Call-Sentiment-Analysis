import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth2";
import { UserService } from "../user.service";
import { User } from "../user.entity";

@Injectable()
export class GoogleAuthService extends PassportStrategy(Strategy, "google") {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["email", "profile", "phone"],
    });
  }

  // make sure to add this or else you won't get the refresh token
  authorizationParams(): { [key: string]: string } {
    return {
      access_type: "offline",
      prompt: "consent",
    };
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any
  ) {
    const { name, emails, photos } = profile;

    const userInDB: User = await this.userService.findByEmail(emails[0].value);

    if (!userInDB) {
      const newUser: any = await this.userService.createUser({
        name: name.givenName + " " + name.familyName,
        email: emails[0].value,
        profilePicture: photos[0].value,
      });

      newUser['accessToken'] = accessToken;
      newUser['refreshToken'] = refreshToken;
      done(null, newUser);
    } else {
      userInDB['accessToken'] = accessToken;
      userInDB['refreshToken'] = refreshToken;
      done(null, userInDB);
    }
  }
}
