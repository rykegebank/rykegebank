export interface DashboardResponseModel {
    remark?: string;
    status?: string;
    message?: Message;
    data?: Data;
  }
  
  export class DashboardResponseModel {
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
    text?: string; // Assuming structure; replace with actual fields
  }
  
  export class Message {
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
    dashboardData?: DashboardData;
    latestCredits?: LatestCredits;
    latestDebits?: LatestDebits;
  }
  
  export class Data {
    constructor(json?: any) {
      this.user = json?.user ? new User(json.user) : undefined;
      this.dashboardData = json?.dashboard_data ? new DashboardData(json.dashboard_data) : undefined;
      this.latestCredits = json?.latest_credits ? new LatestCredits(json.latest_credits) : undefined;
      this.latestDebits = json?.latest_debits ? new LatestDebits(json.latest_debits) : undefined;
    }
  
    toJson(): any {
      return {
        user: this.user?.toJson(),
        dashboard_data: this.dashboardData?.toJson(),
        latest_credits: this.latestCredits?.toJson(),
        latest_debits: this.latestDebits?.toJson(),
      };
    }
  }
  
  export interface LatestDebits {
    data?: LatestDebitsData[];
    nextPageUrl?: string | null;
    path?: string;
  }
  
  export class LatestDebits {
    constructor(json?: any) {
      this.data = json?.data?.map((item: any) => new LatestDebitsData(item)) || [];
      this.nextPageUrl = json?.next_page_url;
      this.path = json?.path;
    }
  
    toJson(): any {
      return {
        data: this.data?.map((item) => item.toJson()),
        next_page_url: this.nextPageUrl,
        path: this.path,
      };
    }
  }
  
  export interface LatestDebitsData {
    id?: number;
    userId?: string;
    branchId?: string;
    branchStaffId?: string;
    amount?: string;
    charge?: string;
    postBalance?: string;
    trxType?: string;
    trx?: string;
    details?: string;
    remark?: string;
    createdAt?: string;
    updatedAt?: string;

  }
  
  export class LatestDebitsData {
    constructor(json?: any) {
      this.id = json?.id;
      this.userId = json?.user_id?.toString();
      this.branchId = json?.branch_id?.toString();
      this.branchStaffId = json?.branch_staff_id?.toString();
      this.amount = json?.amount?.toString();
      this.charge = json?.charge?.toString();
      this.postBalance = json?.post_balance?.toString();
      this.trxType = json?.trx_type?.toString();
      this.trx = json?.trx?.toString();
      this.details = json?.details?.toString();
      this.remark = json?.remark?.toString();
      this.createdAt = json?.created_at;
      this.updatedAt = json?.updated_at;
    }
  
    toJson(): any {
      return {
        id: this.id,
        user_id: this.userId,
        branch_id: this.branchId,
        branch_staff_id: this.branchStaffId,
        amount: this.amount,
        charge: this.charge,
        post_balance: this.postBalance,
        trx_type: this.trxType,
        trx: this.trx,
        details: this.details,
        remark: this.remark,
        created_at: this.createdAt,
        updated_at: this.updatedAt,
      };
    }
  }
  
  export interface LatestCredits {
    data?: LatestCreditsData[];
    nextPageUrl?: string | null;
    path?: string;
  }
  
  export class LatestCredits {
    constructor(json?: any) {
      this.data = json?.data?.map((item: any) => new LatestCreditsData(item)) || [];
      this.nextPageUrl = json?.next_page_url;
      this.path = json?.path;
    }
  
    toJson(): any {
      return {
        data: this.data?.map((item) => item.toJson()),
        next_page_url: this.nextPageUrl,
        path: this.path,
      };
    }
  }
  
  export interface LatestCreditsData {
    id?: number;
    userId?: string;
    branchId?: string;
    branchStaffId?: string;
    amount?: string;
    charge?: string;
    postBalance?: string;
    trxType?: string;
    trx?: string;
    details?: string;
    remark?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export class LatestCreditsData {
    constructor(json?: any) {
      this.id = json?.id;
      this.userId = json?.user_id?.toString();
      this.branchId = json?.branch_id?.toString();
      this.branchStaffId = json?.branch_staff_id?.toString();
      this.amount = json?.amount?.toString();
      this.charge = json?.charge?.toString();
      this.postBalance = json?.post_balance?.toString();
      this.trxType = json?.trx_type?.toString();
      this.trx = json?.trx?.toString();
      this.details = json?.details?.toString();
      this.remark = json?.remark?.toString();
      this.createdAt = json?.created_at;
      this.updatedAt = json?.updated_at;
    }
  
    toJson(): any {
      return {
        id: this.id,
        user_id: this.userId,
        branch_id: this.branchId,
        branch_staff_id: this.branchStaffId,
        amount: this.amount,
        charge: this.charge,
        post_balance: this.postBalance,
        trx_type: this.trxType,
        trx: this.trx,
        details: this.details,
        remark: this.remark,
        created_at: this.createdAt,
        updated_at: this.updatedAt,
      };
    }
  }
  
  export interface DashboardData {
    totalDeposit?: string;
    totalFdr?: string;
    totalWithdraw?: string;
    totalLoan?: string;
    totalDps?: string;
    totalTrx?: string;
  }
  
  export class DashboardData {
    constructor(json?: any) {
      this.totalDeposit = json?.total_deposit?.toString();
      this.totalFdr = json?.total_fdr?.toString();
      this.totalWithdraw = json?.total_withdraw?.toString();
      this.totalLoan = json?.total_loan?.toString();
      this.totalDps = json?.total_dps?.toString();
      this.totalTrx = json?.total_trx?.toString();
    }
  
    toJson(): any {
      return {
        total_deposit: this.totalDeposit,
        total_fdr: this.totalFdr,
        total_withdraw: this.totalWithdraw,
        total_loan: this.totalLoan,
        total_dps: this.totalDps,
        total_trx: this.totalTrx,
      };
    }
  }
  
  export interface User {
    id?: number;
    branchId?: string;
    branchStaffId?: string;
    accountNumber?: string;
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    countryCode?: string;
    mobile?: string;
    refBy?: string;
    referralCommissionCount?: string;
    balance?: string;
    image?: string;
    address?: Address;
    status?: string;
    ev?: string;
    sv?: string;
    verCodeSendAt?: string;
    ts?: string;
    tv?: string;
    tsc?: string;
    kv?: string;
    kycData?: any;
    profileComplete?: string;
    banReason?: any;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export class User {
    constructor(json?: any) {
      this.id = json?.id;
      this.branchId = json?.branch_id?.toString();
      this.branchStaffId = json?.branch_staff_id?.toString();
      this.accountNumber = json?.account_number?.toString();
      this.firstname = json?.firstname;
      this.lastname = json?.lastname;
      this.username = json?.username;
      this.email = json?.email;
      this.countryCode = json?.country_code?.toString();
      this.mobile = json?.mobile?.toString();
      this.refBy = json?.ref_by?.toString();
      this.referralCommissionCount = json?.referral_commission_count?.toString();
      this.balance = json?.balance?.toString();
      this.image = json?.image;
      this.address = json?.address ? new Address(json.address) : undefined;
      this.status = json?.status?.toString();
      this.ev = json?.ev?.toString();
      this.sv = json?.sv?.toString();
      this.verCodeSendAt = json?.ver_code_send_at?.toString();
      this.ts = json?.ts?.toString();
      this.tv = json?.tv?.toString();
      this.tsc = json?.tsc?.toString();
      this.kv = json?.kv?.toString();
      this.kycData = json?.kyc_data;
      this.profileComplete = json?.profile_complete?.toString();
      this.banReason = json?.ban_reason;
      this.createdAt = json?.created_at;
      this.updatedAt = json?.updated_at;
    }
  
    toJson(): any {
      return {
        id: this.id,
        branch_id: this.branchId,
        branch_staff_id: this.branchStaffId,
        account_number: this.accountNumber,
        firstname: this.firstname,
        lastname: this.lastname,
        username: this.username,
        email: this.email,
        country_code: this.countryCode,
        mobile: this.mobile,
        ref_by: this.refBy,
        referral_commission_count: this.referralCommissionCount,
        balance: this.balance,
        image: this.image,
        address: this.address?.toJson(),
        status: this.status,
        ev: this.ev,
        sv: this.sv,
        ver_code_send_at: this.verCodeSendAt,
        ts: this.ts,
        tv: this.tv,
        tsc: this.tsc,
        kv: this.kv,
        kyc_data: this.kycData,
        profile_complete: this.profileComplete,
        ban_reason: this.banReason,
        created_at: this.createdAt,
        updated_at: this.updatedAt,
      };
    }
  }
  
  export interface Address {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
  }
  
  export class Address {
    constructor(json?: any) {
      this.street = json?.street;
      this.city = json?.city;
      this.state = json?.state;
      this.country = json?.country;
    }
  
    toJson(): any {
      return {
        street: this.street,
        city: this.city,
        state: this.state,
        country: this.country,
      };
    }
  }
  