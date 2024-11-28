export interface DashboardResponseModel {
  remark?: string;
  status?: string;
  message?: Message;
  data?: Data;
}

export interface Message {
  text?: string;
}

export interface Data {
  user?: User;
  dashboard_data?: DashboardData;
  latest_credits?: LatestCredits;
  latest_debits?: LatestDebits;
}

export interface LatestDebits {
  data?: LatestDebitsData[];
  next_page_url?: string | null;
  path?: string;
}

export interface LatestDebitsData {
  id?: number;
  user_id?: string;
  branch_id?: string;
  branch_staff_id?: string;
  amount?: string;
  charge?: string;
  post_balance?: string;
  trx_type?: string;
  trx?: string;
  details?: string;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LatestCredits {
  data?: LatestCreditsData[];
  next_page_url?: string | null;
  path?: string;
}

export interface LatestCreditsData {
  id?: number;
  user_id?: string;
  branch_id?: string;
  branch_staff_id?: string;
  amount?: string;
  charge?: string;
  post_balance?: string;
  trx_type?: string;
  trx?: string;
  details?: string;
  remark?: string;
  created_at?: string;
  updated_at?: string;
}

export interface DashboardData {
  total_deposit?: string;
  total_fdr?: string;
  total_withdraw?: string;
  total_loan?: string;
  total_dps?: string;
  total_trx?: string;
}

export interface User {
  id?: number;
  branch_id?: string;
  branch_staff_id?: string;
  account_number?: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  country_code?: string;
  mobile?: string;
  ref_by?: string;
  referral_commission_count?: string;
  balance?: string;
  image?: string;
  address?: Address;
  status?: string;
  ev?: string;
  sv?: string;
  ver_code_send_at?: string;
  ts?: string;
  tv?: string;
  tsc?: string;
  kv?: string;
  otp_verified?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Address {
  city?: string;
  country?: string;
  postal_code?: string;
}
