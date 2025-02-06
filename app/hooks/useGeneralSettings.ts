import { useGeneralSettingsQuery } from '../data/generalSettings/queries';

interface GeneralSettingsState {
    isDepositEnable: boolean;
    isWithdrawEnable: boolean;
    isFDREnable: boolean;
    isDPSEnable: boolean;
    isLoanEnable: boolean;
    isReferralEnable: boolean;
    currencyText: string;
    currencySymbol: string;
    templateName: string;
}

export const useGeneralSettings = () => {
    const { data, error, isLoading } = useGeneralSettingsQuery();

    const settings: GeneralSettingsState = {
        isDepositEnable: false,
        isWithdrawEnable: false,
        isFDREnable: false,
        isDPSEnable: false,
        isLoanEnable: false,
        isReferralEnable: false,
        currencyText: '',
        currencySymbol: '',
        templateName: '',
    };

    const generalSetting = data?.data?.general_setting ?? null;
    if (generalSetting) {
        const modules = generalSetting.modules || {};

        settings.isDepositEnable = modules.deposit == '1';
        settings.isWithdrawEnable = modules.withdraw == '1';
        settings.isFDREnable = modules.fdr == '1';
        settings.isDPSEnable = modules.dps == '1';
        settings.isLoanEnable = modules.loan == '1';
        settings.isReferralEnable = modules.referral_system == '1';

        settings.currencyText = generalSetting.cur_text ?? '';
        settings.currencySymbol = generalSetting.cur_sym ?? '';
        settings.templateName = generalSetting.active_template ?? '';
    }

    // Generate Authorization List from API data
    // Assuming you modify getAuthorizationList to be async if needed
    const getAuthorizationList = async (): Promise<string[]> => {
        if (!generalSetting) return [];

        const modules = generalSetting.modules || {};
        const authList: string[] = [];

        if (modules.otp_email == '1') authList.push('Email');
        if (modules.otp_sms == '1') authList.push('SMS');

        // Only add 'Select One' if it hasn't been added already
        if (!authList.includes('Select One')) {
            authList.unshift('Select One');
        }

        return authList;
    };


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
            return 'tbd'; // Placeholder if username is needed
        }
    };

    const getTemplateName = () => {
        return settings.templateName;
    };

    return {
        settings,
        generalSetting,
        error,
        isLoading,
        getCurrencyOrUsername,
        getTemplateName,
        getAuthorizationList,
    };
};
