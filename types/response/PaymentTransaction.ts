export interface PaymentTransaction {
  id: string;
  amount: number;
  status: string;
  transactionReference?: string | null;
  additionalNotes?: string | null;
  paymentMethod?: string | null;
  createdAt: string;
  updatedAt: string;
}
