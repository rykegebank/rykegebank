export interface IBankBeneficiaryResponseModel {
    remark?: string;
    status?: string;
    message?: IMessage;
    data?: IMainData;
    toJson(): Record<string, unknown>;
  }
  
  export interface IMainData {
    beneficiaries?: IBeneficiaries;
    transferCharge?: string;
    general?: IGeneralSetting;
    toJson(): Record<string, unknown>;
  }
  
  export interface IBeneficiaries {
    data?: IData[];
    nextPageUrl?: any;
    path?: string;
    toJson(): Record<string, unknown>;
  }
  
  export interface IData {
    id?: number;
    userId?: string;
    beneficiaryType?: string;
    beneficiaryId?: string;
    accountNumber?: string;
    accountName?: string;
    shortName?: string;
    details?: any;
    createdAt?: string;
    updatedAt?: string;
    toJson(): Record<string, unknown>;
  }
  
  export interface IMessage {
    text?: string;
    type?: string;
  }
  
  export interface IGeneralSetting {
    settingName?: string;
    settingValue?: any;
  }
  