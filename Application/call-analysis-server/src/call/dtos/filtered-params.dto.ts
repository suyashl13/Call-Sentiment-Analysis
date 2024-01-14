import { Transform } from "class-transformer";

export class FilteredParamsDto {
  @Transform(({ value }) => {
    return Number(value);
  })
  offset: number;
  @Transform(({ value }) => {
    return Number(value);
  })
  limit: number;
}
