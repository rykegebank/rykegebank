import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IData, IBankBeneficiaryResponseModel } from '../../types/beneficiary';

interface BeneficiaryState {
    beneficiaryList: IData[];
    page: number;
    nextPageUrl: string;
    loading: boolean;
    trxSearchText: string;
}

const initialState: BeneficiaryState = {
    beneficiaryList: [],
    page: 1,
    nextPageUrl: '',
    loading: false,
    trxSearchText: '',
};

const beneficiarySlice = createSlice({
    name: 'beneficiary',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setData: (state, action: PayloadAction<IData[]>) => {
            state.beneficiaryList = action.payload;
        },
        appendData: (state, action: PayloadAction<IData[]>) => {
            state.beneficiaryList = [...state.beneficiaryList, ...action.payload];
        },
        setNextPageUrl: (state, action: PayloadAction<string>) => {
            state.nextPageUrl = action.payload;
        },
        incrementPage: (state) => {
            state.page += 1;
        },
        resetPage: (state) => {
            state.page = 1;
        },
        batchUpdate: (state, action: PayloadAction<{ page?: number; trxSearchText?: string }>) => {
            if (action.payload.page !== undefined) {
                state.page = action.payload.page;
            }

        },
    },
});

export const { setLoading, setData, appendData, setNextPageUrl, incrementPage, resetPage, batchUpdate } = beneficiarySlice.actions;
export default beneficiarySlice.reducer;
