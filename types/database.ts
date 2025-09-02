export interface Loan {
  id: string;
  user_id: string;
  nickname: string;
  bank_name: string;
  interest_rate: number;
  total_months: number;
  total_amount: number;
  processing_fee: number;
  payment_day: number;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  loan_id: string;
  user_id: string;
  amount: number;
  payment_date: string;
  due_date: string;
  is_late: boolean;
  notes: string;
  created_at: string;
}