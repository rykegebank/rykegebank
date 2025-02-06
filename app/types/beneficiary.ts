export interface IBankBeneficiaryResponseModel {
  remark?: string;
  status?: string;
  message?: IMessage;
  data?: IMainData;
  to_json(): Record<string, unknown>;
}

export interface IMainData {
  beneficiaries?: IBeneficiaries;
  transfer_charge?: string;
  general?: IGeneralSetting;
  to_json(): Record<string, unknown>;
}

export interface IBeneficiaries {
  data?: IData[];
  next_page_url?: any;
  path?: string;
  to_json(): Record<string, unknown>;
}

export interface IData {
  id?: number;
  user_id?: string;
  beneficiary_type?: string;
  beneficiary_id?: string;
  account_number?: string;
  account_name?: string;
  short_name?: string;
  details?: any;
  created_at?: string;
  updated_at?: string;
  to_json(): Record<string, unknown>;
}

export interface IMessage {
  text?: string;
  type?: string;
}

export interface IGeneralSetting {
  setting_name?: string;
  setting_value?: any;
}
