import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OtpState {
    otpId: string;
    otpType: string;
    nextPageUrl: string;
    submitLoading: boolean;
    resendLoading: boolean;
    status: string;
}

const initialState: OtpState = {
    otpId: '',
    otpType: '',
    nextPageUrl: '',
    submitLoading: false,
    resendLoading: false,
    status: '',
};

// Create the OTP slice
const otpSlice = createSlice({
    name: 'otp',
    initialState,
    reducers: {
        setOtpState: (state, action: PayloadAction<Partial<OtpState>>) => {
            return { ...state, ...action.payload };
        },
        setSubmitLoading: (state, action: PayloadAction<boolean>) => {
            state.submitLoading = action.payload;
        },
        setResendLoading: (state, action: PayloadAction<boolean>) => {
            state.resendLoading = action.payload;
        },
        setOtpStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload;
        },
        setOtpId: (state, action: PayloadAction<string>) => {
            state.otpId = action.payload;
        },
        setOtpType: (state, action: PayloadAction<string>) => {
            state.otpType = action.payload;
        },
        setNextPageUrl: (state, action: PayloadAction<string>) => {
            state.nextPageUrl = action.payload;
        },
    },
});

export const { setOtpState, setSubmitLoading, setResendLoading, setOtpStatus, setOtpId, setOtpType, setNextPageUrl } = otpSlice.actions;

export default otpSlice.reducer;
