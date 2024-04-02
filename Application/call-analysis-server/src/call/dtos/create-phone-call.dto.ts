import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { CallType } from "src/common/types";

export class CreatePhoneCallDto {
  @IsString()
  customerName: string;

  @IsString()
  customerPhone: string;

  
  callRecordingUrl: any;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  callDateTime: Date;

  @IsString()
  callType: CallType;
}
