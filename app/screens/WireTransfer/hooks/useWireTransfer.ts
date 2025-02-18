import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useQuery, useMutation } from '@tanstack/react-query';
import DocumentPicker from 'expo-document-picker';

import { AuthorizationResponseModel } from '../../../types/authorization';
import {
    setLoading,
    setAuthorizationList,
    setSelectedAuthorizationMode,
    setCurrency,
    loadData,
    hasError,
    submitWireTransferRequest,
    changeSelectedValue,
    changeSelectedRadioBtnValue,
    changeSelectedCheckBoxValue,
    changeSelectedFile,
} from '../../../store/slices/wireTransferSlice';
import api from "../../../data/api";

export const useWireTransfer = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.wireTransfer);

    const submitMutation = useMutation({
        mutationFn: async (params: { amount: string; twoFactorCode: string }) => {
            dispatch(setLoading(true));
            const errors = dispatch(hasError());
            if (state.errors.length > 0) {
                dispatch(setLoading(false));
                return Promise.reject(errors);
            }
            const { data } = await api.post<AuthorizationResponseModel>('', params);
            return data;
        },
        onSuccess: (response: AuthorizationResponseModel) => {
            if (response.status?.toLowerCase() === 'success') {
                if (response.data?.otpId) {
                    // navigate('OtpScreen', { otpId: response.data.otpId });
                } else {
                    // navigate('TransferHistoryScreen');
                    // showSuccessSnackbar(response.message?.success || ['Request successful']);
                }
            } else {
                // showErrorSnackbar(response.message?.error || ['Request failed']);
            }
            dispatch(setLoading(false));
        },
        onError: (error) => {
            // showErrorSnackbar([error.message || 'Submission failed']);
            dispatch(setLoading(false));
        },
    });

    const pickFile = async (index: number) => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
            });
            if (result.type === 'success') {
                dispatch(changeSelectedFile({ index, file: result.file }));
            }
        } catch (error) {
            // showErrorSnackbar(['File selection failed']);
        }
    };

    const changeSelectedValueHandler = (index: number, value: string) => {
        dispatch(changeSelectedValue({ index, value }));
    };

    const changeSelectedRadioBtnValueHandler = (listIndex: number, selectedIndex: number) => {
        dispatch(changeSelectedRadioBtnValue({ listIndex, selectedIndex }));
    };

    const changeSelectedCheckBoxValueHandler = (listIndex: number, value: string) => {
        dispatch(changeSelectedCheckBoxValue({ listIndex, value }));
    };

    const changeSelectedFileHandler = (index: number, file: File) => {
        dispatch(changeSelectedFile({ index, file }));
    };

    const changeNoInternetStatusHandler = (status: boolean) => {
        // dispatch(changeNoInternetStatus(status));
    };

    return {
        state,
        submitMutation,
        pickFile,
        changeSelectedValue: changeSelectedValueHandler,
        changeSelectedRadioBtnValue: changeSelectedRadioBtnValueHandler,
        changeSelectedCheckBoxValue: changeSelectedCheckBoxValueHandler,
        changeSelectedFile: changeSelectedFileHandler,
        changeNoInternetStatus: changeNoInternetStatusHandler,
        dispatch,
    };
};
