import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userSlice from "./slices/userSlice";
import internetReducer from "./slices/internetSlice";
import transactionHistorySlice from "./slices/transactionHistorySlice";

export const store = configureStore({
  reducer: {
    internet: internetReducer,
    user: userSlice.reducer,
    transactionHistory: transactionHistorySlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;