export interface MainLanguageResponseModel {
    remark?: string;
    status?: string;
    message?: Message;
    data?: Data;
}

export interface Message {
    [key: string]: any; // Define structure if the content of 'message' is known
}

export interface Data {
    languages?: Languages[];
    file?: string;
}

export interface Languages {
    id?: number;
    name?: string;
    code?: string;
    icon?: string;
    textAlign?: string;
    isDefault?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface LanguageModel {
    imageUrl: string;
    languageName: string;
    languageCode: string;
    countryCode: string;
}