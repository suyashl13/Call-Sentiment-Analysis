import { Transform } from "class-transformer";
import { IsString } from "class-validator";

export class PageParamsDto {
  @IsString()
  limit: number;

  @IsString()
  offset: number;
}
