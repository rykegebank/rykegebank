import { configureStore } from "@reduxjs/toolkit";
import internetReducer from "../hooks/internetSlice"; 

export const store = configureStore({
  reducer: {
    internet: internetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
