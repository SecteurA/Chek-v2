export interface ChequeLCR {
  id: number;
  payment_type: 'check' | 'lcr';
  payment_mode: 'pay' | 'receive';
  reference: string;
  issue_date: string;
  due_date: string;
  amount: number;
  beneficiary_id?: number;
  emitter_id?: number;
  bank_account_id?: number;
  status: 'pending' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
  beneficiary?: Beneficiary;
  emitter?: Emitter;
  bank_account?: BankAccount & { bank: Bank };
}

export interface Beneficiary {
  id: number;
  name: {
    fr: string;
    ar: string;
  };
  address?: {
    fr: string;
    ar: string;
  };
  created_at: string;
}

export interface Emitter {
  id: number;
  name: {
    fr: string;
    ar: string;
  };
  address?: {
    fr: string;
    ar: string;
  };
  created_at: string;
}

export interface Bank {
  id: number;
  name: {
    fr: string;
    ar: string;
  };
  code: string;
  created_at: string;
}

export interface BankAccount {
  id: number;
  bank_id: number;
  account_number: string;
  rib: string;
  title: {
    fr: string;
    ar: string;
  };
  created_at: string;
  bank?: Bank;
}