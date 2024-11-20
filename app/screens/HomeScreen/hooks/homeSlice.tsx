// homeSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { DashboardResponseModel, LatestCreditsData, LatestDebitsData } from '../../../data/dashboard';
import { request } from '../../../utils/apiClient';
import { formatNumber } from '../../../utils/stringFormatHelper';
import { Endpoints } from '../../../constants';

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
    async (_, { rejectWithValue }) => {
        try {
            const url = Endpoints.dashboard;
            const response = await request(url, 'GET', true);
            console.log('load' + response);

            if (response.status?.toLowerCase() === 'success') {
                return response as DashboardResponseModel;
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
            .addCase(loadData.fulfilled, (state, action: PayloadAction<DashboardResponseModel>) => {
                const model = action.payload;

                state.username = model.data?.user?.username || '';
                state.email = model.data?.user?.email || '';
                state.accountNumber = model.data?.user?.accountNumber || '';
                state.imagePath = model.data?.user?.image || '';
                state.balance = formatNumber(model.data?.user?.balance || '');

                // Handle credits and debits
                const credits = model.data?.latestCredits?.data?.map(
                    (credit) => new LatestDebitsData({ ...credit, remark: credit.details })
                ) || [];
                state.debitsLists = [...credits];

                const debits = model.data?.latestDebits?.data || [];
                state.debitsLists.push(...debits);

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
