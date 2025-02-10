export interface AuthorizationResponseModel {
    remark?: string;
    status?: string;
    message: Message;
    data?: Data;
}

export interface Data {
    trx?: string;
    otpId?: string;
    verificationId?: string;
}

interface Message {
    success?: string[];
    error?: string[];
}