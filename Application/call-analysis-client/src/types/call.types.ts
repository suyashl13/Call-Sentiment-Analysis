import { PagedResponse } from "./page.types";
import { User } from "./user.types";

export interface CreateCallInterface {
  customerName: string;
  customerPhone: string;
  callRecordingUrl: any;
  callType: CallType | null;
  callDateTime: Date;
}

export enum CallType {
  INCOMING = "INCOMING",
  OUTGOING = "OUTGOING",
}

export interface ResponseCallInterface {
  id: string;
  customerName: string;
  customerPhone: string;
  callRecordingUrl: string;
  callType: CallType;
  callDateTime: Date;
  callRecordingStatus: string
  predictionResult: string
  generatedCallSentiment: string
  createdBy: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface CallsResponse extends PagedResponse {
  data: ResponseCallInterface[]
}