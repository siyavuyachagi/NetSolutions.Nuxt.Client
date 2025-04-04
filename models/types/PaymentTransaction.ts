export enum EStatus {
  Pending = "Pending",
  Complete = "Complete",
  Successfull = "Successfull",
  Failed = "Failed",
  Cancelled = "Cancelled",
}

export interface PaymentTransaction {
  id: string;
  amount: number;
  status: EStatus;
  transactionReference?: string;
  additionalNotes?: string;
  createdAt: string;
  updatedAt: string;
}
