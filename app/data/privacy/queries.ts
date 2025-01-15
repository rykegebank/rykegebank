import { useQuery } from "@tanstack/react-query";
import api from "../api";
import { URLS } from "../urls";
import { manageApiException } from '../../utils/errorHandler';

interface PrivacyResponseModel {
    remark?: string;
    status?: string;
    message?: Message | null;
    data?: Data | null;
}

interface Message {
    error?: string[];
    success?: string[];
}

interface Data {
    policy_pages?: PolicyPages[];
}

interface PolicyPages {
    id?: number;
    data_keys?: string;
    data_values?: DataValues | null;
    created_at?: string;
    updated_at?: string;
}

interface DataValues {
    title?: string;
    content?: string;
}

export const useFetchPolicy = (templateName: string) => {
    return useQuery<PolicyPages[], Error>({
        queryKey: ['Policy', templateName],
        queryFn: async () => {
            try {
                const response = await api.get<PrivacyResponseModel>(`${URLS.policy}?template=${templateName}`);
                if (response.data?.data?.policy_pages) {
                    return response.data.data.policy_pages;
                } else {
                    throw new Error('Policy data is missing');
                }
            } catch (error) {
                manageApiException(error);
                throw error;
            }
        },
    });
};
