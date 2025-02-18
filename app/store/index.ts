import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userSlice from "./slices/userSlice";
import internetReducer from "./slices/internetSlice";
import transactionHistorySlice from "./slices/transactionHistorySlice";
import languageSlice from "./slices/languageSlice";
import beneficiarySlice from "./slices/beneficiarySlice";
import myBankTransferSlice from "./slices/myBankTransferSlice";
import otpSlice from "./slices/otpSlice";
import wireTransferSlice from "./slices/wireTransferSlice";

export const store = configureStore({
  reducer: {
    internet: internetReducer,
    user: userSlice.reducer,
    transactionHistory: transactionHistorySlice,
    language: languageSlice,
    beneficiary: beneficiarySlice,
    myBankTransfer: myBankTransferSlice,
    otp: otpSlice,
    wireTransfer:wireTransferSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;