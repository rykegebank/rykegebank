import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { request } from '../utils/apiClient';
import { RootState } from '../store';
import { Endpoints } from '../constants';
import { GeneralSettingsResponseModel, parseGeneralSettingsResponseModel } from '../data/generalSettings';

interface GeneralSettingsState {
    settings: GeneralSettingsResponseModel | null;
    isLoading: boolean;
    error: string | null;
    isDepositEnable: boolean;
    isWithdrawEnable: boolean;
    isFDREnable: boolean;
    isDPSEnable: boolean;
    isLoanEnable: boolean;
    isReferralEnable: boolean;
}

// Initial state
const initialState: GeneralSettingsState = {
    settings: null,
    isLoading: false,
    error: null,
    isDepositEnable: false,
    isWithdrawEnable: false,
    isFDREnable: false,
    isDPSEnable: false,
    isLoanEnable: false,
    isReferralEnable: false,
};

// Define the async thunk to fetch settings
export const fetchGeneralSettings = createAsyncThunk(
    'generalSettings/fetch',
    async (_, { rejectWithValue }) => {
        console.log('fetchGeneralSettings called');
        try {
            const url = Endpoints.generalSettings;
            const response = await request(url, 'GET', null, false);

            const parsedResponse = parseGeneralSettingsResponseModel(response); // Parse the response

            return parsedResponse;
        } catch (error: any) {
            console.log('Error during fetchGeneralSettings:', error);
            return rejectWithValue(error.message || 'Failed to fetch general settings');
        }
    }
);

// Create the slice
const generalSettingsSlice = createSlice({
    name: 'generalSettings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGeneralSettings.pending, (state) => {
                console.log('fetchGeneralSettings is loading...');
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchGeneralSettings.fulfilled, (state, action: PayloadAction<GeneralSettingsResponseModel>) => {
                console.log('fetchGeneralSettings fulfilled');
                state.isLoading = false;
                state.settings = action.payload;
                state.error = null;

                // Destructure the modules from the fetched data
                const modules = action.payload.data?.general_setting?.modules || {};

                // Set module enablement based on the fetched response
                console.log('modules.deposit ' + modules.deposit)
                state.isDepositEnable = modules.deposit == '1';
                state.isWithdrawEnable = modules.withdraw == '1';
                state.isFDREnable = modules.fdr == '1';
                state.isDPSEnable = modules.dps == '1';
                state.isLoanEnable = modules.loan == '1';
                state.isReferralEnable = modules.referral_system == '1';
            })
            .addCase(fetchGeneralSettings.rejected, (state, action: PayloadAction<any>) => {
                console.log('fetchGeneralSettings rejected');
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

// Adding getCurrencyOrUsername function to the slice
export const getCurrencyOrUsername = ({ isCurrency = true, isSymbol = false }: { isCurrency?: boolean, isSymbol?: boolean }) => {
    return (state: RootState) => {
        const settings = state.generalSettings.settings;
        if (settings) {
            if (isCurrency) {
                const model = settings.data?.general_setting;
                return isSymbol ? model?.cur_sym ?? '' : model?.cur_text ?? '';
            } else {
                return 'tbd'; // Customize based on your needs
            }
        }
        return '';
    };
};

export const selectModuleEnablement = (state: RootState) => ({
    isDepositEnable: state.generalSettings.isDepositEnable,
    isWithdrawEnable: state.generalSettings.isWithdrawEnable,
    isFDREnable: state.generalSettings.isFDREnable,
    isDPSEnable: state.generalSettings.isDPSEnable,
    isLoanEnable: state.generalSettings.isLoanEnable,
    isReferralEnable: state.generalSettings.isReferralEnable,
});

// Export reducer
export const selectGeneralSettings = (state: RootState) => state.generalSettings;
export default generalSettingsSlice.reducer;
