import { IsEmail, IsString, IsUrl } from "class-validator";

export class CreateUserDto {

    @IsString()
    name: string;

    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    @IsUrl()
    profilePicture: string;
}