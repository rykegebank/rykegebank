import { useQuery } from '@tanstack/react-query';
import api from '../data/api';
import { URLS } from '../data/urls';
import { GeneralSettingsResponseModel } from '../data/generalSettings';

interface GeneralSettingsState {
    isDepositEnable: boolean;
    isWithdrawEnable: boolean;
    isFDREnable: boolean;
    isDPSEnable: boolean;
    isLoanEnable: boolean;
    isReferralEnable: boolean;
    currencyText: string;
    currencySymbol: string;
}

const fetchGeneralSettings = async () => {
    try {
        const response = await api.get(URLS.generalSettings);

        // console.log('Raw General Settings Response:', response.data);

        return response.data;
    } catch (error: any) {
        console.error('Error fetching general settings:', error.message || 'Unknown error');
        throw new Error(error.message || 'Failed to fetch general settings');
    }
};

export const useGeneralSettings = () => {
    const { data, error, isLoading } = useQuery<GeneralSettingsResponseModel, Error>({
        queryKey: ['generalSettings'],
        queryFn: fetchGeneralSettings,
    });

    const settings: GeneralSettingsState = {
        isDepositEnable: false,
        isWithdrawEnable: false,
        isFDREnable: false,
        isDPSEnable: false,
        isLoanEnable: false,
        isReferralEnable: false,
        currencyText: 'tbd',
        currencySymbol: '',
    };

    if (data) {
        const modules = data.data?.general_setting?.modules || {};
        // console.log('Parsed modules:', data.data?.general_setting);

        settings.isDepositEnable = modules.deposit == '1';
        settings.isWithdrawEnable = modules.withdraw == '1';
        settings.isFDREnable = modules.fdr == '1';
        settings.isDPSEnable = modules.dps == '1';
        settings.isLoanEnable = modules.loan == '1';
        settings.isReferralEnable = modules.referral_system == '1';

        const model = data.data?.general_setting;
        settings.currencyText = model?.cur_text ?? 'tbd';
        settings.currencySymbol = model?.cur_sym ?? '';

        // console.log('Parsed Settings:', settings);
    }

    const getCurrencyOrUsername = ({
        isCurrency = true,
        isSymbol = false,
    }: {
        isCurrency?: boolean;
        isSymbol?: boolean;
    }) => {
        if (isCurrency) {
            return isSymbol ? settings.currencySymbol : settings.currencyText;
        } else {
            return 'tbd';
        }
    };

    return {
        settings,
        error,
        isLoading,
        getCurrencyOrUsername,
    };
};
