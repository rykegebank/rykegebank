import { useQuery } from "@tanstack/react-query";
import api from "../api";
import { URLS } from "../urls";
import { manageApiException } from '../../utils/errorHandler';
import { MainLanguageResponseModel } from '../../types/language';

export const useFetchLanguage = (languageCode: string) => {
    return useQuery<MainLanguageResponseModel, Error>({
        queryKey: ['Policy', languageCode],
        queryFn: async () => {
            try {
                console.log('language',`${URLS.language}${languageCode}`)
                const response = await api.get<MainLanguageResponseModel>(`${URLS.language}${languageCode}`);
                if (response && response.data) {
                    return response.data;
                } else {
                    throw new Error('Language is missing');
                }
            } catch (error) {
                manageApiException(error);
                throw error;
            }
        },
    });
};
