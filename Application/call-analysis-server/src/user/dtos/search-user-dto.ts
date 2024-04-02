import { IsEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class SearchEmployeeDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsNumber()
    @IsOptional()
    page?: number = 0;
}