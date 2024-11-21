export interface GeneralSettingsResponseModel {
  remark?: string;
  status?: string;
  message?: Message;
  data?: Data;
}

export interface Message {
  [key: string]: any; // Customize this type as per the expected structure of `Message`
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
  created_at?: any; // Replace `any` with the actual type if known
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

// Example function to parse JSON into GeneralSettingsResponseModel
export const parseGeneralSettingsResponseModel = (json: any): GeneralSettingsResponseModel => {
  return {
    remark: json.remark,
    status: json.status,
    message: json.message,
    data: json.data
      ? {
          general_setting: json.data.general_setting
            ? {
                id: json.data.general_setting.id,
                site_name: json.data.general_setting.site_name,
                cur_text: json.data.general_setting.cur_text,
                cur_sym: json.data.general_setting.cur_sym,
                email_from: json.data.general_setting.email_from,
                base_color: json.data.general_setting.base_color,
                secondary_color: json.data.general_setting.secondary_color,
                kv: json.data.general_setting.kv,
                ev: json.data.general_setting.ev,
                en: json.data.general_setting.en,
                sv: json.data.general_setting.sv,
                sn: json.data.general_setting.sn,
                pn: json.data.general_setting.pn,
                force_ssl: json.data.general_setting.force_ssl,
                maintenance_mode: json.data.general_setting.maintenance_mode,
                secure_password: json.data.general_setting.secure_password,
                agree: json.data.general_setting.agree,
                registration: json.data.general_setting.registration,
                active_template: json.data.general_setting.active_template,
                system_info: json.data.general_setting.system_info,
                modules: json.data.general_setting.modules
                  ? {
                      deposit: json.data.general_setting.modules.deposit,
                      withdraw: json.data.general_setting.modules.withdraw,
                      dps: json.data.general_setting.modules.dps,
                      fdr: json.data.general_setting.modules.fdr,
                      loan: json.data.general_setting.modules.loan,
                      own_bank: json.data.general_setting.modules.own_bank,
                      other_bank: json.data.general_setting.modules.other_bank,
                      otp_email: json.data.general_setting.modules.otp_email,
                      otp_sms: json.data.general_setting.modules.otp_sms,
                      branch_create_user: json.data.general_setting.modules.branch_create_user,
                      wire_transfer: json.data.general_setting.modules.wire_transfer,
                      referral_system: json.data.general_setting.modules.referral_system,
                    }
                  : undefined,
                account_no_length: json.data.general_setting.account_no_length,
                account_no_prefix: json.data.general_setting.account_no_prefix,
                otp_time: json.data.general_setting.otp_time,
                daily_transfer_limit: json.data.general_setting.daily_transfer_limit,
                monthly_transfer_limit: json.data.general_setting.monthly_transfer_limit,
                minimum_transfer_limit: json.data.general_setting.minimum_transfer_limit,
                fixed_transfer_charge: json.data.general_setting.fixed_transfer_charge,
                percent_transfer_charge: json.data.general_setting.percent_transfer_charge,
                referral_commission_count: json.data.general_setting.referral_commission_count,
                last_dps_cron: json.data.general_setting.last_dps_cron,
                last_fdr_cron: json.data.general_setting.last_fdr_cron,
                last_loan_cron: json.data.general_setting.last_loan_cron,
                created_at: json.data.general_setting.created_at,
                updated_at: json.data.general_setting.updated_at,
              }
            : undefined,
        }
      : undefined,
  };
};
