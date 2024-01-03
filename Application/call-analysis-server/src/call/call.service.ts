import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhoneCall } from './entities/phone-call.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CallService {
    constructor (@InjectRepository(PhoneCall) private phoneCallRepository: Repository<PhoneCall>) {}

    async createPhoneCall(phoneCall: Partial<PhoneCall>, userId: string){
        const unsavedPhoneCall = this.phoneCallRepository.create({
            ...phoneCall,
            user: { id: userId }
        });
        unsavedPhoneCall.callRecordingStatus = 'pending';
        return this.phoneCallRepository.save(unsavedPhoneCall);
    }
}
