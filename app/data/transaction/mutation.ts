import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { IBankBeneficiaryResponseModel } from "../../types/beneficiary";
import { URLS } from "../../data/urls";
import api from "../../data/api";
import { manageApiException } from "../../utils/errorHandler";
import {
    setLoading,
    setData,
    appendData,
    setNextPageUrl,
    incrementPage,
    batchUpdate,
    setBeneficiaryData,
} from "../../store/slices/beneficiarySlice";
import {
    setLimits,
    setAuthorizationList,
    setSelectedAuthorization,
} from "../../store/slices/myBankTransferSlice";

import { RootState, useAppDispatch } from "../../store";
import { useGeneralSettings } from "../../hooks/useGeneralSettings";
import { useNavigation } from "@react-navigation/native";
import { AuthorizationResponseModel } from "../../types/authorization";
import { Routes, Strings } from "../../constants";

interface TranferParams {
    beneficiary_id: string,
    amount: number,
    auth_mode: string
}
export const useTransferToOther = (selectedAuthMode: string) => {
    const navigation = useNavigation()
    return useMutation({
        mutationFn: async (params: TranferParams) => {

            console.log(`${URLS.otherBankTransfer}${params.beneficiary_id}`)
            const {
                data,
            } = await api.post<AuthorizationResponseModel>(`${URLS.otherBankTransfer}${params.beneficiary_id}`, {
                ...params
            })

            console.log(data)
            return data

        },
        onSuccess: (data) => {
            if (data.status == 'success') {
                const otp = data?.data?.otpId ?? '';
                if (otp ) {
                    navigation.navigate(Routes.otp, { nextPageRoute: Routes.transferHistory,
                         otpId: otp, otpType: selectedAuthMode?.toLowerCase.toString() });
                } else {
                    navigation.navigate(Routes.transferHistory);
                }
            } else {
                manageApiException(data.message.error ?? Strings.requestFailed, "top");
            }
        },
    });  
};

