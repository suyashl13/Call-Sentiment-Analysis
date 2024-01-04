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
            createdBy: { id: userId }
        });
        unsavedPhoneCall.callRecordingStatus = 'pending';
        return this.phoneCallRepository.save(unsavedPhoneCall);
    }


    async getPhoneCallsByUserId(userId: string, page: number = 1, limit: number = 10) {
        return this.phoneCallRepository.find({
            where: { createdBy: { id: userId } },
            skip: (page - 1) * limit,
            take: limit,
            relations: {
                createdBy: true,
            }
        });
    }
}
