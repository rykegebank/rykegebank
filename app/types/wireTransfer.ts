export interface WireTransferResponseModel {
    remark?: string;
    status?: string;
    message?: Message;
    data?: Data;
}

export interface Message {
    success?: string[]; 
    error?: string[];    
}

export interface Data {
    setting?: Setting;
    form?: Form;
}

export interface Form {
    id?: number;
    act?: string;
    formData?: FormData;
    createdAt?: string;
    updatedAt?: string;
}

export interface FormData {
    list?: FormModel[];
}

export interface FormModel {
    name?: string;
    label?: string;
    isRequired?: string;
    extensions?: string;
    options?: string[];
    type?: string;
    selectedValue?: any;
    file?: File | string; // Ensure file can be File or string
    cbSelected?: string[];
}

export interface Setting {
    id?: number;
    minimumLimit?: string;
    maximumLimit?: string;
    dailyMaximumLimit?: string;
    monthlyMaximumLimit?: string;
    dailyTotalTransaction?: string;
    monthlyTotalTransaction?: string;
    fixedCharge?: string;
    percentCharge?: string;
    instruction?: string;
    createdAt?: string;
    updatedAt?: string;
}
