export interface I_Transaction {
  perticulars: string;
  amount: number;
  transactionDate: Date;
  transactionType: 'Cr' | 'Dr';
  branchCode: string;
  id?: string;
}
