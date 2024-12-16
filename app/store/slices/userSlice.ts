import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = any | null;

interface UserState {
  user: User;
  is_authenticated: boolean;
  profile_complete: number;
  ev: number;
  sv: number;
  email: string;
  mobile: string;
  timer: number;
  isTimerRunning: boolean; // New property to track timer state
}

const initialState: UserState = {
  user: null,
  is_authenticated: false,
  profile_complete: 0,
  ev: 0,
  sv: 0,
  email: '',
  mobile: '',
  timer: 0,
  isTimerRunning: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.is_authenticated = action.payload;
    },
    setIsProfileCompleted: (state, action: PayloadAction<number>) => {
      state.profile_complete = action.payload;
    },
    setIsEmailVerified: (state, action: PayloadAction<number>) => {
      state.ev = action.payload;
    },
    setIsSmsVerified: (state, action: PayloadAction<number>) => {
      state.sv = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setMobile: (state, action: PayloadAction<string>) => {
      state.mobile = action.payload;
    },
    updateTimer: (state, action: PayloadAction<number>) => {
      state.timer = action.payload;
    },
    setTimerRunning: (state, action: PayloadAction<boolean>) => {
      state.isTimerRunning = action.payload;
    },
    resetUser: () => initialState,
  },
});

export const {
  setUser,
  setIsAuthenticated,
  setIsProfileCompleted,
  setIsEmailVerified,
  setIsSmsVerified,
  resetUser,
  setEmail,
  setMobile,
  updateTimer,
  setTimerRunning,
} = userSlice.actions;

export default userSlice;
