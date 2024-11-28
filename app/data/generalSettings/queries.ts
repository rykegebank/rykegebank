import { useQuery } from '@tanstack/react-query';
import api from '../api';
import { URLS } from '../urls';
import { GeneralSettingsResponseModel } from '../../types/generalSettings';

export const fetchGeneralSettings = async (): Promise<GeneralSettingsResponseModel> => {
    try {
        const response = await api.get(URLS.generalSettings);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching general settings:', error.message || 'Unknown error');
        throw new Error(error.message || 'Failed to fetch general settings');
    }
};

export const useGeneralSettingsQuery = () => {
    return useQuery<GeneralSettingsResponseModel, Error>({
        queryKey: ['generalSettings'],
        queryFn: fetchGeneralSettings,
    });
};
