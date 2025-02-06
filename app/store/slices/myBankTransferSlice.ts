import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IData } from "../../types/beneficiary"; // Adjust path

interface MyBankTransferState {
    isLoading: boolean;
    beneficiaryList: IData[];
    currency: string;
    currencySymbol: string;
    limitPerTrx: string;
    dailyMaxLimit: string;
    monthlyLimit: string;
    chargePerTrx: string;
    authorizationList: string[];
    selectedAuthorizationMode?: string;
    isLimitShow: boolean;
}

const initialState: MyBankTransferState = {
    isLoading: true,
    beneficiaryList: [],
    currency: "",
    currencySymbol: "",
    limitPerTrx: "0",
    dailyMaxLimit: "0",
    monthlyLimit: "0",
    chargePerTrx: "0",
    authorizationList: [],
    selectedAuthorizationMode: undefined,
    isLimitShow: false,
};

const myBankTransferSlice = createSlice({
    name: "myBankTransfer",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setBeneficiaryList: (state, action: PayloadAction<IData[]>) => {
            state.beneficiaryList = action.payload;
        },
        setLimits: (state, action: PayloadAction<Partial<MyBankTransferState>>) => {
            Object.assign(state, action.payload);
        },
        setAuthorizationList: (state, action: PayloadAction<string[]>) => {
            console.log('setAuthorizationList', action.payload)
            state.authorizationList = action.payload;
        },
        setSelectedAuthorization: (state, action: PayloadAction<string>) => {
            state.selectedAuthorizationMode = action.payload;
        },
        toggleLimitShow: (state) => {
            state.isLimitShow = !state.isLimitShow;
        },
    },
});

export const {
    setLoading,
    setBeneficiaryList,
    setLimits,
    setAuthorizationList,
    setSelectedAuthorization,
    toggleLimitShow,
} = myBankTransferSlice.actions;

export default myBankTransferSlice.reducer;
