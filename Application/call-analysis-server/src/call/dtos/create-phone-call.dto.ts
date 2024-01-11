import { Transform } from "class-transformer";
import { IsDate, IsString } from "class-validator";
import { CallType } from "src/common/types";

export class CreatePhoneCallDto {
    @IsString()
    customerName: string

    @IsString()
    customerPhone: string

    @IsString()
    callRecordingUrl: string

    @Transform(({ value }) => new Date(value))
    @IsDate()
    callDateTime: Date

    @IsString()
    callType: CallType
}