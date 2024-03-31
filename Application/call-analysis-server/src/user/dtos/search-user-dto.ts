import { IsNumber, IsString } from "class-validator";

export class SearchEmployeeDto {
    @IsString()
    name?: string;

    @IsString()
    email?: string;

    @IsNumber()
    page?: number = 0;
}