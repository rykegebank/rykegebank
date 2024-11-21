// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../screens/HomeScreen/hooks/homeSlice';
import generalSettingsReducer from '../hooks/generalSettings';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    generalSettings: generalSettingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
