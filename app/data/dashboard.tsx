export interface DashboardResponseModel {
  remark?: string;
  status?: string;
  message?: Message;
  data?: Data;
}

export class DashboardResponseModel {
  remark?: string;
  status?: string;
  message?: Message;
  data?: Data;

  constructor(json?: any) {
    this.remark = json?.remark;
    this.status = json?.status;
    this.message = json?.message ? new Message(json.message) : undefined;
    this.data = json?.data ? new Data(json.data) : undefined;
  }

  toJson(): any {
    return {
      remark: this.remark,
      status: this.status,
      message: this.message?.toJson(),
      data: this.data?.toJson(),
    };
  }
}

export interface Message {
  text?: string;
}

export class Message {
  text?: string;

  constructor(json?: any) {
    this.text = json?.text;
  }

  toJson(): any {
    return {
      text: this.text,
    };
  }
}

export interface Data {
  user?: User;
  dashboard_data?: DashboardData;
  latest_credits?: LatestCredits;
  latest_debits?: LatestDebits;
}

export class Data {
  user?: User;
  dashboard_data?: DashboardData;
  latest_credits?: LatestCredits;
  latest_debits?: LatestDebits;

  constructor(json?: any) {
    this.user = json?.user ? new User(json.user) : undefined;
    this.dashboard_data = json?.dashboard_data ? new DashboardData(json.dashboard_data) : undefined;
    this.latest_credits = json?.latest_credits ? new LatestCredits(json.latest_credits) : undefined;
    this.latest_debits = json?.latest_debits ? new LatestDebits(json.latest_debits) : undefined;
  }

  toJson(): any {
    return {
      user: this.user?.toJson(),
      dashboard_data: this.dashboard_data?.toJson(),
      latest_credits: this.latest_credits?.toJson(),
      latest_debits: this.latest_debits?.toJson(),
    };
  }
}

export interface LatestDebits {
  data?: LatestDebitsData[];
  next_page_url?: string | null;
  path?: string;
}

export class LatestDebits {
  data?: LatestDebitsData[];
  next_page_url?: string | null;
  path?: string;

  constructor(json?: any) {
    this.data = json?.data?.map((item: any) => new LatestDebitsData(item)) || [];
    this.next_page_url = json?.next_page_url;
    this.path = json?.path;
  }

  toJson(): any {
    return {
      data: this.data?.map((item) => item.toJson()),
      next_page_url: this.next_page_url,
      path: this.path,
    };
  }
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

export class LatestDebitsData {
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

  constructor(json?: any) {
    this.id = json?.id;
    this.user_id = json?.user_id?.toString();
    this.branch_id = json?.branch_id?.toString();
    this.branch_staff_id = json?.branch_staff_id?.toString();
    this.amount = json?.amount?.toString();
    this.charge = json?.charge?.toString();
    this.post_balance = json?.post_balance?.toString();
    this.trx_type = json?.trx_type?.toString();
    this.trx = json?.trx?.toString();
    this.details = json?.details?.toString();
    this.remark = json?.remark?.toString();
    this.created_at = json?.created_at;
    this.updated_at = json?.updated_at;
  }

  toJson(): any {
    return {
      id: this.id,
      user_id: this.user_id,
      branch_id: this.branch_id,
      branch_staff_id: this.branch_staff_id,
      amount: this.amount,
      charge: this.charge,
      post_balance: this.post_balance,
      trx_type: this.trx_type,
      trx: this.trx,
      details: this.details,
      remark: this.remark,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

export interface LatestCredits {
  data?: LatestCreditsData[];
  next_page_url?: string | null;
  path?: string;
}

export class LatestCredits {
  data?: LatestCreditsData[];
  next_page_url?: string | null;
  path?: string;

  constructor(json?: any) {
    this.data = json?.data?.map((item: any) => new LatestCreditsData(item)) || [];
    this.next_page_url = json?.next_page_url;
    this.path = json?.path;
  }

  toJson(): any {
    return {
      data: this.data?.map((item) => item.toJson()),
      next_page_url: this.next_page_url,
      path: this.path,
    };
  }
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

export class LatestCreditsData {
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

  constructor(json?: any) {
    this.id = json?.id;
    this.user_id = json?.user_id?.toString();
    this.branch_id = json?.branch_id?.toString();
    this.branch_staff_id = json?.branch_staff_id?.toString();
    this.amount = json?.amount?.toString();
    this.charge = json?.charge?.toString();
    this.post_balance = json?.post_balance?.toString();
    this.trx_type = json?.trx_type?.toString();
    this.trx = json?.trx?.toString();
    this.details = json?.details?.toString();
    this.remark = json?.remark?.toString();
    this.created_at = json?.created_at;
    this.updated_at = json?.updated_at;
  }

  toJson(): any {
    return {
      id: this.id,
      user_id: this.user_id,
      branch_id: this.branch_id,
      branch_staff_id: this.branch_staff_id,
      amount: this.amount,
      charge: this.charge,
      post_balance: this.post_balance,
      trx_type: this.trx_type,
      trx: this.trx,
      details: this.details,
      remark: this.remark,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

export interface DashboardData {
  total_deposit?: string;
  total_fdr?: string;
  total_withdraw?: string;
  total_loan?: string;
  total_dps?: string;
  total_trx?: string;
}

export class DashboardData {
  total_deposit?: string;
  total_fdr?: string;
  total_withdraw?: string;
  total_loan?: string;
  total_dps?: string;
  total_trx?: string;

  constructor(json?: any) {
    this.total_deposit = json?.total_deposit?.toString();
    this.total_fdr = json?.total_fdr?.toString();
    this.total_withdraw = json?.total_withdraw?.toString();
    this.total_loan = json?.total_loan?.toString();
    this.total_dps = json?.total_dps?.toString();
    this.total_trx = json?.total_trx?.toString();
  }

  toJson(): any {
    return {
      total_deposit: this.total_deposit,
      total_fdr: this.total_fdr,
      total_withdraw: this.total_withdraw,
      total_loan: this.total_loan,
      total_dps: this.total_dps,
      total_trx: this.total_trx,
    };
  }
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

export class User {
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

  constructor(json?: any) {
    this.id = json?.id;
    this.branch_id = json?.branch_id?.toString();
    this.branch_staff_id = json?.branch_staff_id?.toString();
    this.account_number = json?.account_number?.toString();
    this.firstname = json?.firstname?.toString();
    this.lastname = json?.lastname?.toString();
    this.username = json?.username?.toString();
    this.email = json?.email?.toString();
    this.country_code = json?.country_code?.toString();
    this.mobile = json?.mobile?.toString();
    this.ref_by = json?.ref_by?.toString();
    this.referral_commission_count = json?.referral_commission_count?.toString();
    this.balance = json?.balance?.toString();
    this.image = json?.image?.toString();
    this.address = json?.address ? new Address(json.address) : undefined;
    this.status = json?.status?.toString();
    this.ev = json?.ev?.toString();
    this.sv = json?.sv?.toString();
    this.ver_code_send_at = json?.ver_code_send_at?.toString();
    this.ts = json?.ts?.toString();
    this.tv = json?.tv?.toString();
    this.tsc = json?.tsc?.toString();
    this.kv = json?.kv?.toString();
    this.otp_verified = json?.otp_verified;
    this.created_at = json?.created_at;
    this.updated_at = json?.updated_at;
  }

  toJson(): any {
    return {
      id: this.id,
      branch_id: this.branch_id,
      branch_staff_id: this.branch_staff_id,
      account_number: this.account_number,
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      email: this.email,
      country_code: this.country_code,
      mobile: this.mobile,
      ref_by: this.ref_by,
      referral_commission_count: this.referral_commission_count,
      balance: this.balance,
      image: this.image,
      address: this.address?.toJson(),
      status: this.status,
      ev: this.ev,
      sv: this.sv,
      ver_code_send_at: this.ver_code_send_at,
      ts: this.ts,
      tv: this.tv,
      tsc: this.tsc,
      kv: this.kv,
      otp_verified: this.otp_verified,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

export interface Address {
  city?: string;
  country?: string;
  postal_code?: string;
}

export class Address {
  city?: string;
  country?: string;
  postal_code?: string;

  constructor(json?: any) {
    this.city = json?.city?.toString();
    this.country = json?.country?.toString();
    this.postal_code = json?.postal_code?.toString();
  }

  toJson(): any {
    return {
      city: this.city,
      country: this.country,
      postal_code: this.postal_code,
    };
  }
}
