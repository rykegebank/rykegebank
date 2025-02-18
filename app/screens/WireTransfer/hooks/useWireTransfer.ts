import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useQuery, useMutation } from '@tanstack/react-query';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { useNavigation } from "@react-navigation/native";

import { useAppSelector } from "../../../store";
import { AuthorizationResponseModel } from '../../../types/authorization';
import { WireTransferResponseModel, parseFormData } from '../../../types/wireTransfer';
import {
    setLoading,
    setAuthorizationList,
    setSelectedAuthorizationMode,
    setCurrency,
    loadData,
    hasError,
    setLimits,
    submitWireTransferRequest,
    changeSelectedValue,
    changeSelectedRadioBtnValue,
    changeSelectedCheckBoxValue,
    changeSelectedFile,
} from '../../../store/slices/wireTransferSlice';
import api from "../../../data/api";
import { URLS } from "../../../data/urls";
import { manageApiException } from '../../../utils/errorHandler';
import { useGeneralSettings } from "../../../hooks/useGeneralSettings";
import { Strings, Routes } from '../../../constants'

export const useWireTransfer = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { selectedAuthorizationMode, authorizationList, formList } = useAppSelector((state) => state.wireTransfer);
    const state = useSelector((state: RootState) => state.wireTransfer);
    const { getCurrencyOrUsername, getAuthorizationList, generalSetting } = useGeneralSettings();

    const parseWireTransferData = (data: WireTransferResponseModel) => {
        const formData = data.data?.form?.form_data;
        console.log('form_data before parsing:', formData);

        const parsedFormData = parseFormData(formData);
        console.log('Parsed form data:', parsedFormData);

        const parsedData = {
            ...data,
            data: {
                ...data.data,
                form: {
                    ...data.data?.form,
                    form_data: parsedFormData
                }
            }
        };

        console.log('Parsed Data:', parsedData);  // Log parsed data for debugging
        return parsedData;
    };


    const initData = useMutation({
        mutationFn: async () => {

            dispatch(setLoading(true));
            const url = `${URLS.wireTransferFormUrl}`;
            const { data } = await api.get(url);
            console.log('data', data);
            return data;
        },
        onSuccess: (data) => {
            if (data.status == 'success') {
                console.log('success')

                const parsedData = parseWireTransferData(data);
                console.log('parsedData', parsedData)
                const currency = getCurrencyOrUsername({ isCurrency: true });
                const currencySymbol = getCurrencyOrUsername({ isCurrency: true, isSymbol: true });
                const authList = getAuthorizationList();
                dispatch(setAuthorizationList(authList));
                dispatch(setSelectedAuthorizationMode(authList[0]));
                dispatch(loadData(parsedData));
                dispatch(setLimits({ currency, currencySymbol }));
                dispatch(setLoading(false));
            } else {
                dispatch(setLoading(false));
                manageApiException(data.message);
            }
        },

        onError: (error) => {
            dispatch(setLoading(false));
            manageApiException(error);
        },
    });

    const submitMutation = useMutation({
        mutationFn: async (params: { amount: string; twoFactorCode: string }) => {
            dispatch(setLoading(true));
            const errors = dispatch(hasError());
            if (state.errors.length > 0) {
                dispatch(setLoading(false));
                return Promise.reject(errors);
            }
            const { data } = await api.post<AuthorizationResponseModel>(URLS.wireTransferFormUrl, params);
            return data;
        },
        onSuccess: (data: AuthorizationResponseModel) => {
            if (data.status?.toLowerCase() === 'success') {
                if (data.data?.otpId) {
                    const otp = data?.data?.otpId ?? '';
                    if (otp && authorizationList.length > 1) {
                        navigation.navigate(Routes.otp, { nextPageRoute: Routes.transferHistory, otpId: otp, otpType: selectedAuthorizationMode?.toLowerCase.toString() });
                    } else {
                        navigation.navigate(Routes.transferHistory);
                    }
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
            const result: DocumentPickerResponse = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.images, DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx],
            });

            if (result) {
                dispatch(changeSelectedFile({ index, fileName: result.name }));
            }
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                console.log("User canceled file picker");
            } else {
                console.error("File selection failed", error);
            }
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

    const changeSelectedFileHandler = (index: number, file: DocumentPickerResponse) => {
        dispatch(changeSelectedFile({ index, file }));
    };

    const changeNoInternetStatusHandler = (status: boolean) => {
        // dispatch(changeNoInternetStatus(status));
    };

    const initializeData = () => {
        initData.mutate();  // No need to pass any arguments
    };


    return {
        state,
        initializeData,
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
