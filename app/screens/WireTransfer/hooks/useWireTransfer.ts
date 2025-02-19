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

    const state = useSelector((state: RootState) => state.wireTransfer);
    const { selectedAuthorizationMode, authorizationList, formList, errors } = useAppSelector((state) => state.wireTransfer);
    const { getCurrencyOrUsername, getAuthorizationList, generalSetting } = useGeneralSettings();

    const parseWireTransferData = (data: WireTransferResponseModel) => {
        const formData = data.data?.form?.form_data;

        const parsedFormData = parseFormData(formData);

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

        return parsedData;
    };


    const initData = useMutation({
        mutationFn: async () => {

            dispatch(setLoading(true));
            const url = `${URLS.wireTransferFormUrl}`;
            const { data } = await api.get(url);
            return data;
        },
        onSuccess: (data) => {
            if (data.status == 'success') {

                const parsedData = parseWireTransferData(data);
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
        mutationFn: async ({ amount, twoFactorCode }: {
            amount: string;
            twoFactorCode: string;
        }) => {
            if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
                manageApiException(Strings.invalidAmount, "top");
                return Promise.reject(new Error(Strings.invalidAmount));
            }

            dispatch(setLoading(true));
            dispatch(hasError());

            if (errors.length > 0) {
                dispatch(setLoading(false));
                manageApiException(errors.join(", "), "top");
                return Promise.reject(new Error(errors.join(", ")));
            }

            try {
                // Convert form data to match Flutter's modelToMap function
                const fieldList: Record<string, string> = {};
                const filesList: { key: string; value: any }[] = [];

                formList.forEach((e) => {
                    if (e.type === "checkbox" && e.cb_selected?.length) {
                        e.cb_selected.forEach((item, index) => {
                            fieldList[`${e.label}[${index}]`] = item;
                        });
                    } else if (e.type === "file" && e.file) {
                        filesList.push({ key: e.label ?? "", value: e.file });
                    } else if (e.selected_value?.toString().trim()) {
                        fieldList[e.label ?? ""] = e.selected_value;
                    }
                });

                // Construct form data for multipart request
                const formData = new FormData();
                formData.append("amount", amount);

                if (twoFactorCode.trim()) {
                    formData.append("authenticator_code", twoFactorCode);
                }

                if (selectedAuthorizationMode.trim() && selectedAuthorizationMode.toLowerCase() !== 'Select One') {
                    formData.append("auth_mode", selectedAuthorizationMode.toLowerCase());
                }

                // Append form fields
                Object.entries(fieldList).forEach(([key, value]) => {
                    formData.append(key, value);
                });

                // Append files
                filesList.forEach(({ key, value }) => {
                    formData.append(key, {
                        uri: value.uri,
                        name: value.name,
                        type: value.type,
                    } as any);
                });

                const { data } = await api.post<AuthorizationResponseModel>(`${URLS.wireTransferRequestUrl}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });

                dispatch(setLoading(false));
                return data;
            } catch (error: any) {
                dispatch(setLoading(false));
                manageApiException(error.response?.data?.message || Strings.requestFailed, "top");
                return Promise.reject(error);
            }
        },
        onSuccess: (data: AuthorizationResponseModel) => {
            if (data.status?.toLowerCase() === "success") {
                const otp = data.data?.otpId ?? "";

                if (otp && authorizationList.length > 1) {
                    navigation.navigate(Routes.otp, { nextPageRoute: Routes.transferHistory, otpId: otp, otpType: selectedAuthorizationMode?.toLowerCase() ?? "" });
                } else {
                    navigation.navigate(Routes.transferHistory);
                }
            } else {
                manageApiException(data.message?.error ?? Strings.requestFailed, "top");
            }
        },
        onError: (error: any) => {
            dispatch(setLoading(false));
            manageApiException(error?.message ?? Strings.requestFailed, "top");
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

    const changeAuthorizationMode = (value?: string) => {
        if (value) {
            dispatch(setSelectedAuthorizationMode(value));
        }
    };


    return {
        state,
        initializeData,
        submitMutation,
        changeAuthorizationMode,
        pickFile,
        changeSelectedValue: changeSelectedValueHandler,
        changeSelectedRadioBtnValue: changeSelectedRadioBtnValueHandler,
        changeSelectedCheckBoxValue: changeSelectedCheckBoxValueHandler,
        changeSelectedFile: changeSelectedFileHandler,
        changeNoInternetStatus: changeNoInternetStatusHandler,
        dispatch,
    };
};
