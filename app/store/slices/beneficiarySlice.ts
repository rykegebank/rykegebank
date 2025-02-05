import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBankBeneficiaryResponseModel, IData } from '../../types/beneficiary';

interface BeneficiaryState {
    isLoading: boolean;
    beneficiaryList: IData[];
    nextPageUrl: string;
    page: number;
    trxSearchText: string;
    beneficiaryData?: IBankBeneficiaryResponseModel;
}

const initialState: BeneficiaryState = {
    isLoading: false,
    beneficiaryList: [],
    nextPageUrl: '',
    page: 1,
    trxSearchText: '',
    beneficiaryData: undefined,
};

const beneficiarySlice = createSlice({
    name: 'beneficiary',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
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
        batchUpdate: (state, action: PayloadAction<Partial<BeneficiaryState>>) => {
            Object.assign(state, action.payload);
        },
        setBeneficiaryData: (state, action: PayloadAction<IBankBeneficiaryResponseModel>) => {
            state.beneficiaryData = action.payload; // Store the full response
        },
    },
});

export const {
    setLoading,
    setData,
    appendData,
    setNextPageUrl,
    incrementPage,
    resetPage,
    batchUpdate,
    setBeneficiaryData,
} = beneficiarySlice.actions;

export default beneficiarySlice.reducer;
