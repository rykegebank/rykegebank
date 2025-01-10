export interface Message {
  text?: string;
  code?: number;
}

export interface Remark {
  remark?: string;
}

export interface TransactionData {
  id?: number;
  userId?: string;
  amount?: string;
  charge?: string;
  currency?: string;
  post_balance?: string;
  trx_type?: string;
  trx?: string;
  details?: string;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Transactions {
  data?: TransactionData[];
  next_page_url?: string | null;
  path?: string;
}

export interface Data {
  transactions?: Transactions;
  remarks?: Remark[];
}

export interface TransactionResponse {
  remark?: string;
  status?: string;
  message?: Message;
  data?: Data;
}
