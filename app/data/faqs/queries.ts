import { useQuery } from "@tanstack/react-query";
import api from "../api";
import { URLS } from "../urls";
import { manageApiException } from '../../utils/errorHandler';

export interface FaqResponseModel {
    remark?: string;
    status?: string;
    message?: Message | null;
    data?: Data | null;
}

export interface Message {
    error?: string[];
    success?: string[];
}

export interface Data {
    faqs?: Faq[];
}

export interface Faq {
    id?: number;
    dataKeys?: string;
    data_values?: DataValues | null;
    templateName?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface DataValues {
    question?: string;
    answer?: string;
}

export const useFetchFaqs = () => {
    return useQuery<Faq[], Error>({
        queryKey: ['Faqs'],
        queryFn: async () => {
            try {
                const response = await api.get<FaqResponseModel>(URLS.faq);
                // Ensure we check if faqs exist and return them
                if (response.data?.data?.faqs) {
                    return response.data.data.faqs;
                } else {
                    throw new Error('Faqs data is missing');
                }
            } catch (error) {
                manageApiException(error);
                throw error;
            }
        },
    });
};
