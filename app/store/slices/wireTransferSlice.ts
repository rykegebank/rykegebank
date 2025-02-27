import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WireTransferResponseModel, FormModel, Setting } from '../../types/wireTransfer';

interface WireTransferState {
    isLoading: boolean;
    formList: FormModel[];
    authorizationList: string[];
    selectedAuthorizationMode: string;
    currency: string;
    currencySymbol: string;
    errors: string[];
    setting?: Setting
}

const initialState: WireTransferState = {
    isLoading: true,
    formList: [],
    authorizationList: [],
    selectedAuthorizationMode: '',
    currency: '',
    currencySymbol: '',
    errors: [],
    setting: undefined
};

const wireTransferSlice = createSlice({
    name: 'wireTransfer',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setAuthorizationList: (state, action: PayloadAction<string[]>) => {
            state.authorizationList = action.payload;
        },
        setSelectedAuthorizationMode: (state, action: PayloadAction<string>) => {
            state.selectedAuthorizationMode = action.payload;
        },
        setCurrency: (state, action: PayloadAction<{ currency: string; currencySymbol: string }>) => {
            state.currency = action.payload.currency;
            state.currencySymbol = action.payload.currencySymbol;
        },
        loadData: (state, action: PayloadAction<WireTransferResponseModel>) => {
            const model = action.payload;
            state.setting = model.data?.setting;
            // Ensure formList is populated correctly
            const formList = model.data?.form?.form_data?.list || [];

            // Handle formList mapping if it's not empty
            state.formList = formList.map((element) => {
                if (element.type === 'select' && element.options && element.options.length > 0) {
                    return {
                        ...element,
                        options: ['Select One', ...element.options],
                        selectedValue: 'Select One',
                    };
                }
                return element;
            });

        },

        hasError: (state) => {
            const errors = state.formList.reduce<string[]>((errors, element) => {
                if (element.is_required == 'required' && (!element.selected_value || element.selected_value == 'Select One')) {
                    errors.push(`${element.name} is required`);
                }
                return errors;
            }, []);
            state.errors = errors; // Set the errors in the state
        },
        clearErrors: (state) => {
            state.errors = [];
        },
        setLimits: (state, action: PayloadAction<Partial<WireTransferState>>) => {
            Object.assign(state, action.payload); // Merge the new state values into the existing state
        },
        // New actions for updating form state
        changeSelectedValue: (state, action: PayloadAction<{ index: number; value: string }>) => {
            state.formList[action.payload.index].selected_value = action.payload.value;
        },
        changeSelectedRadioBtnValue: (state, action: PayloadAction<{ listIndex: number; selectedIndex: number }>) => {
            const selectedValue = state.formList[action.payload.listIndex].options?.[action.payload.selectedIndex];
            state.formList[action.payload.listIndex].selected_value = selectedValue || '';
        },
        changeSelectedCheckBoxValue: (
            state,
            action: PayloadAction<{ listIndex: number; value: string }>
        ) => {
            const { listIndex, value } = action.payload;
            const [indexStr, statusStr] = value.split("_");
            const index = parseInt(indexStr, 10);
            const status = statusStr === "true";

            let selectedValue = state.formList[listIndex].cb_selected || [];
            const optionValue = state.formList[listIndex].options?.[index] || "";

            if (status) {
                if (!selectedValue.includes(optionValue)) {
                    selectedValue = [...selectedValue, optionValue];
                    state.formList[listIndex].cb_selected = selectedValue;
                }
            } else {
                if (selectedValue.includes(optionValue)) {
                    selectedValue = selectedValue.filter((item) => item !== optionValue);
                    state.formList[listIndex].cb_selected = selectedValue;
                }
            }
        },

        changeSelectedFile: (state, action: PayloadAction<{ index: number; fileName: string }>) => {
            state.formList[action.payload.index].selected_value = action.payload.fileName;
        },

    },
});

export const {
    setLoading,
    setAuthorizationList,
    setSelectedAuthorizationMode,
    setCurrency,
    loadData,
    hasError,
    clearErrors,
    setLimits,
    changeSelectedValue,
    changeSelectedRadioBtnValue,
    changeSelectedCheckBoxValue,
    changeSelectedFile,
} = wireTransferSlice.actions;

export default wireTransferSlice.reducer;
