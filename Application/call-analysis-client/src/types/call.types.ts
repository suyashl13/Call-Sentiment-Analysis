export interface CreateCallInterface {
  customerName: string;
  customerPhone: string;
  callRecordingUrl: string;
  callType: CallType;
  callDateTime: Date;
}

export enum CallType {
  INCOMING = "INCOMING",
  OUTGOING = "OUTGOING",
}