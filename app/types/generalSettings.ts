export interface GeneralSettingsResponseModel {
  remark?: string;
  status?: string;
  message?: Message;
  data?: Data;
}

export interface Message {
  [key: string]: any; 
}

export interface Data {
  general_setting?: GeneralSetting;  
}

export interface GeneralSetting {
  id?: number;
  site_name?: string;
  cur_text?: string;
  cur_sym?: string;
  email_from?: string;
  email_template?: string;
  sms_body?: string;
  sms_from?: string;
  base_color?: string;
  secondary_color?: string;
  kv?: string;
  ev?: string;
  en?: string;
  sv?: string;
  sn?: string;
  pn?: string;
  force_ssl?: string;
  maintenance_mode?: string;
  secure_password?: string;
  agree?: string;
  registration?: string;
  active_template?: string;
  system_info?: string;
  modules?: Modules; 
  account_no_length?: string;
  account_no_prefix?: string;
  otp_time?: string;
  daily_transfer_limit?: string;
  monthly_transfer_limit?: string;
  minimum_transfer_limit?: string;
  fixed_transfer_charge?: string;
  percent_transfer_charge?: string;
  referral_commission_count?: string;
  last_dps_cron?: string;
  last_fdr_cron?: string;
  last_loan_cron?: string;
  created_at?: any;
  updated_at?: string;
}

export interface Modules {
  deposit?: string;
  withdraw?: string;
  dps?: string;
  fdr?: string;
  loan?: string;
  own_bank?: string;
  other_bank?: string;
  otp_email?: string;
  otp_sms?: string;
  branch_create_user?: string;
  wire_transfer?: string;
  referral_system?: string;
}
