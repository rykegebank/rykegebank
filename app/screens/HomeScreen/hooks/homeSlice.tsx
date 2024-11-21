import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { DashboardResponseModel, LatestCreditsData, LatestDebitsData } from '../../../data/dashboard';
import { request } from '../../../utils/apiClient';
import { formatNumber } from '../../../utils/stringFormatHelper';
import { Endpoints } from '../../../constants';
import {  selectGeneralSettings,getCurrencyOrUsername } from '../../../hooks/generalSettings';

interface HomeState {
    isLoading: boolean;
    noInternet: boolean;
    username: string;
    email: string;
    balance: string;
    accountNumber: string;
    accountName: string;
    currency: string;
    currencySymbol: string;
    imagePath: string;
    debitsLists: LatestDebitsData[];
}

const initialState: HomeState = {
    isLoading: true,
    noInternet: false,
    username: '',
    email: '',
    balance: '',
    accountNumber: '',
    accountName: '',
    currency: '',
    currencySymbol: '',
    imagePath: '',
    debitsLists: [],
};

export const loadData = createAsyncThunk(
    'home/loadData',
    async (_, { rejectWithValue, getState }) => {
        try {
            const state = getState() as RootState;
            // Fetch currency and currency symbol using the selector
            const currency = getCurrencyOrUsername({ isCurrency: true })(state);  // Get currency using selector
            const currencySymbol = getCurrencyOrUsername({ isCurrency: true, isSymbol: true })(state);  // Get currency symbol using selector
    
            console.log('Currency:', currency);
            console.log('Currency Symbol:', currencySymbol);

            const url = Endpoints.dashboard;
            const response = await request(url, 'GET', true);

            if (response.status?.toLowerCase() === 'success') {
                const model = response as DashboardResponseModel;

                return {
                    username: model.data?.user?.username || '',
                    email: model.data?.user?.email || '',
                    accountNumber: model.data?.user?.account_number || '',
                    imagePath: model.data?.user?.image || '',
                    balance: formatNumber(model.data?.user?.balance || ''),
                    currency,
                    currencySymbol,
                    debitsLists: [
                        ...((model.data?.latest_credits?.data?.map(
                            (credit) => new LatestDebitsData({ ...credit, remark: credit.details })
                        ) || [])),
                        ...(model.data?.latest_debits?.data || []),
                    ],
                };
            } else {
                return rejectWithValue('Failed to load data');
            }
        } catch (error: any) {
            if (error.response?.status === 503) {
                return rejectWithValue('No internet connection');
            }
            return rejectWithValue(error.response?.data?.message || error.message || 'An error occurred');
        }
    }
);

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setNoInternetStatus: (state, action: PayloadAction<boolean>) => {
            state.noInternet = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loadData.fulfilled, (state, action: PayloadAction<any>) => {
                // Set the values from the fulfilled response
                state.username = action.payload.username;
                state.email = action.payload.email;
                state.accountNumber = action.payload.accountNumber;
                state.imagePath = action.payload.imagePath;
                state.balance = action.payload.balance;
                state.currency = action.payload.currency;
                state.currencySymbol = action.payload.currencySymbol;
                state.debitsLists = action.payload.debitsLists;

                state.isLoading = false;
            })
            .addCase(loadData.rejected, (state, action) => {
                state.isLoading = false;
                if (action.payload === 'No internet connection') {
                    state.noInternet = true;
                }
            });
    },
});

export const { setNoInternetStatus } = homeSlice.actions;
export const selectHome = (state: RootState) => state.home;
export default homeSlice.reducer;
