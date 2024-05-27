import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PhoneCall } from "./entities/phone-call.entity";
import { Repository } from "typeorm";

@Injectable()
export class CallService {
  constructor(
    @InjectRepository(PhoneCall)
    private readonly phoneCallRepository: Repository<PhoneCall>
  ) {}

  async createPhoneCall(phoneCall: Partial<PhoneCall>, userId: string) {
    const unsavedPhoneCall = this.phoneCallRepository.create({
      ...phoneCall,
      createdBy: { id: userId },
    });
    unsavedPhoneCall.callRecordingStatus = "pending";
    return this.phoneCallRepository.save(unsavedPhoneCall);
  }

  async getPhoneCallsByUserId(
    userId: string,
    page: number = 1,
    limit: number = 10
  ) {
    return this.phoneCallRepository.find({
      where: { createdBy: { id: userId } },
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        createdBy: true,
      },
    });
  }

  async getPhoneCallsByUserIdWithoutPagging(
    userId: string,
  ) {
    return this.phoneCallRepository.find({
      where: { createdBy: { id: userId } },
      relations: {
        createdBy: true,
      },
    });
  }

  async getPhoneCallCountByUserId(id: string) {
    return this.phoneCallRepository.count({ where: { createdBy: { id: id } } });
  }

  async getAllPhoneCalls() {
    return await this.phoneCallRepository.find({
      select:{
        id: true,
        customerName: true,
        customerPhone: true,
        callRecordingUrl: true,
        callDateTime: true,
        callRecordingStatus: true,
        generatedCallSentiment: true,
        predictionResult: true,
        callType: true,
        createdAt: true,
        updatedAt: true,
        createdBy: {
          id: true,
          name: true
        }
      }
    });
  }
}
