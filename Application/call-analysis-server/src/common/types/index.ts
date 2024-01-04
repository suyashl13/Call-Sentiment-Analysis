export enum CallType {
  INCOMING = "INCOMING",
  OUTGOING = "OUTGOING",
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
  role: number;
  isActive: boolean;
  createdAt: any;
  updatedAt: any;
}
