import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { languages } from '../../constants/strings';

interface Locale {
    languageCode: string;
    countryCode: string;
}

interface LanguageState {
    locale: Locale;
    isLtr: boolean;
    languageData: any;
    error: any;
    isLoading: boolean;
    isInitialized: boolean;
}

const initialState: LanguageState = {
    locale: {
        languageCode: languages[0].languageCode,
        countryCode: languages[0].countryCode,
    },
    isLtr: true,
    languageData: null,
    error: null,
    isLoading: false,
    isInitialized: false
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLocale: (state, action: PayloadAction<Locale>) => {
            state.locale = action.payload;
        },
        setIsLtr: (state, action: PayloadAction<boolean>) => {
            state.isLtr = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setData: (state, action: PayloadAction<any>) => {
            state.languageData = action.payload;
        },
        setError: (state, action: PayloadAction<any>) => {
            state.error = action.payload;
        },
        setIsInitialized: (state, action: PayloadAction<boolean>) => {
            state.isInitialized = action.payload;
        },
    },
});

export const { setLocale, setIsLtr, setLoading, setData, setError, setIsInitialized } = languageSlice.actions;

export default languageSlice.reducer;
