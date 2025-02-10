import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from '@tanstack/react-query';

import { useAppSelector } from "../../../store";
import { setSelectedAuthorization, toggleLimitShow, setLoading } from "../../../store/slices/myBankTransferSlice";
import { useBeneficiary } from "../../../data/beneficiary/mutation";
import { manageApiException } from '../../../utils/errorHandler';
import { Strings, Routes } from '../../../constants'
import { AuthorizationResponseModel } from '../../../types/authorization';
import { URLS } from "../../../data/urls";
import api from "../../../data/api";

export const useMyBankTransfer = () => {
    const { selectedAuthorizationMode, authorizationList } = useAppSelector((state) => state.myBankTransfer);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { loadMoreBeneficiary, nextPageUrl } = useBeneficiary();

    const changeAuthorizationMode = (value?: string) => {
        if (value) {
            dispatch(setSelectedAuthorization(value));
        }
    };

    const loadPaginationData = async () => {
        await loadMoreBeneficiary();
    };

    const hasNext = () => nextPageUrl !== "" && nextPageUrl !== "null";

    const handleToggleLimitShow = () => {
        dispatch(toggleLimitShow());
    };

    // Call `useMutation` directly inside the custom hook
    const mutation = useMutation({
        mutationFn: async ({ id, amount }: { id: string; amount: string }) => {
            if (!amount) {
                manageApiException(Strings.invalidAmount, "top");
                return;
            }

            if (authorizationList.length > 1 && selectedAuthorizationMode?.toLowerCase() === 'Select One') {
                manageApiException(Strings.selectAuthModeMsg, "top");
                return;
            }

            dispatch(setLoading(true));
            const url = URLS.myBankTransferUrl + id;
            let params: { [key: string]: string } = { amount: amount.toString() };

            if (selectedAuthorizationMode && selectedAuthorizationMode.toLowerCase() !== 'Select One') {
                params['auth_mode'] = selectedAuthorizationMode.toLowerCase();
            }
            console.log('url', url)
            const { data } = await api.post<AuthorizationResponseModel>(url, params);
            return data;
        },
        onSuccess: (data) => {
            if (data.status == 'success') {
                const otp = data?.data?.otpId ?? '';
                handleToggleLimitShow();
                if (otp && authorizationList.length > 1) {
                    navigation.navigate(Routes.otp, { nextPageRoute: Routes.transferHistory, otpId: otp, otpType: selectedAuthorizationMode?.toLowerCase.toString() });
                } else {
                    navigation.navigate(Routes.transferHistory);
                }
            } else {
                manageApiException(data.message.error ?? Strings.requestFailed, "top");
            }
            dispatch(setLoading(false));
        },

        onError: () => {
            dispatch(setLoading(false));
            manageApiException(Strings.requestFailed, "top");
        },
    });

    const transferMoney = (id: string, amount: string) => {
        mutation.mutate({ id, amount });  // Trigger the mutation here
    };

    return {
        changeAuthorizationMode,
        loadPaginationData,
        hasNext,
        handleToggleLimitShow,
        transferMoney,
    };
};
