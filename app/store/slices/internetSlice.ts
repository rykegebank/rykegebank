import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface InternetState {
    isOffline: boolean;
    errorMessage: string | null;
}

const initialState: InternetState = {
    isOffline: false,
    errorMessage: null,
};

const internetSlice = createSlice({
    name: "internet",
    initialState,
    reducers: {
        setOffline(state, action: PayloadAction<boolean>) {
            state.isOffline = action.payload;
        },

    },
});

export const { setOffline } = internetSlice.actions;
export default internetSlice.reducer;
