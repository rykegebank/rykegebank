import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WireTransferResponseModel, FormModel } from '../../types/wireTransfer';
import { DocumentPickerResponse } from 'react-native-document-picker';

interface WireTransferState {
    isLoading: boolean;
    formList: FormModel[];
    authorizationList: string[];
    selectedAuthorizationMode: string;
    currency: string;
    currencySymbol: string;
    errors: string[];
}

const initialState: WireTransferState = {
    isLoading: true,
    formList: [],
    authorizationList: [],
    selectedAuthorizationMode: '',
    currency: '',
    currencySymbol: '',
    errors: [],
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
            state.formList = model.data?.form?.formData?.list?.map((element) => {
                if (element.type == 'select' && element.options && element.options.length > 0) {
                    return {
                        ...element,
                        options: ['Select One', ...element.options],
                        selectedValue: 'Select One',
                    };
                }
                return element;
            }) || [];
        },
        hasError: (state) => {
            const errors = state.formList.reduce<string[]>((errors, element) => {
                if (element.isRequired == 'required' && (!element.selectedValue || element.selectedValue == 'Select One')) {
                    errors.push(`${element.name} is required`);
                }
                return errors;
            }, []);
            state.errors = errors; // Set the errors in the state
        },
        submitWireTransferRequest: (state, action: PayloadAction<{ amount: string; twoFactorCode: string }>) => {
            const { amount, twoFactorCode } = action.payload;
            if (!amount) {
                throw new Error('Invalid amount');
            }
            const errors = state.formList.reduce<string[]>((errors, element) => {
                if (element.isRequired === 'required' && (!element.selectedValue || element.selectedValue === 'Select One')) {
                    errors.push(`${element.name} is required`);
                }
                return errors;
            }, []);
            if (errors.length > 0) {
                throw new Error(errors.join(', '));
            }
            state.isLoading = true;
        },
        setLimits: (state, action: PayloadAction<Partial<WireTransferState>>) => {
            Object.assign(state, action.payload); // Merge the new state values into the existing state
        },
        // New actions for updating form state
        changeSelectedValue: (state, action: PayloadAction<{ index: number; value: string }>) => {
            state.formList[action.payload.index].selectedValue = action.payload.value;
        },
        changeSelectedRadioBtnValue: (state, action: PayloadAction<{ listIndex: number; selectedIndex: number }>) => {
            const selectedValue = state.formList[action.payload.listIndex].options?.[action.payload.selectedIndex];
            state.formList[action.payload.listIndex].selectedValue = selectedValue || '';
        },
        changeSelectedCheckBoxValue: (state, action: PayloadAction<{ listIndex: number; value: string }>) => {
            const { listIndex, value } = action.payload;
            const [index, status] = value.split('_');
            const selectedValue = state.formList[listIndex].cbSelected || [];
            const selectedOption = state.formList[listIndex].options?.[parseInt(index)];

            if (status === 'true' && !selectedValue.includes(selectedOption)) {
                selectedValue.push(selectedOption || '');
            } else if (status === 'false') {
                const valueIndex = selectedValue.indexOf(selectedOption || '');
                if (valueIndex !== -1) {
                    selectedValue.splice(valueIndex, 1);
                }
            }
            state.formList[listIndex].cbSelected = selectedValue;
        },
        changeSelectedFile: (state, action: PayloadAction<{ index: number; fileName: string }>) => {
            state.formList[action.payload.index].selectedValue = action.payload.fileName;
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
    submitWireTransferRequest,
    setLimits,
    changeSelectedValue,
    changeSelectedRadioBtnValue,
    changeSelectedCheckBoxValue,
    changeSelectedFile,
} = wireTransferSlice.actions;

export default wireTransferSlice.reducer;
