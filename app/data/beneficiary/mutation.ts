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

import { RootState } from "../../store";
import { useGeneralSettings } from "../../hooks/useGeneralSettings";

export const useBeneficiary = () => {
    const dispatch = useDispatch();
    const { getCurrencyOrUsername, getAuthorizationList, generalSetting } = useGeneralSettings();
    const { page, beneficiaryList, nextPageUrl, beneficiaryData } = useSelector((state: RootState) => state.beneficiary);

    // Load Limit Function (Optimized with useCallback)
    const loadLimit = useCallback(() => {
        if (!generalSetting) return;
        dispatch(
            setLimits({
                chargePerTrx: beneficiaryData?.data?.transfer_charge ?? "",
                limitPerTrx: generalSetting.minimum_transfer_limit ?? "0",
                dailyMaxLimit: generalSetting.daily_transfer_limit ?? "0",
                monthlyLimit: generalSetting.monthly_transfer_limit ?? "0",
            })
        );
    }, [dispatch, generalSetting, beneficiaryData]);

    const { mutateAsync } = useMutation({
        mutationFn: async ({ page, isReset = false }: { page: number; isReset?: boolean }) => {
            const url = `${URLS.myBankBeneficiaryUrl}?page=${page}`;
            const { data } = await api.get<IBankBeneficiaryResponseModel>(url);
            return data;
        },
        onError: (error) => {
            dispatch(setLoading(false));
            manageApiException(error);
        },
        onSuccess: async (data, { page, isReset }) => {

            if (data.status?.toLowerCase() !== "success") {
                manageApiException(data.message);
                return;
            }

            // Extract Beneficiary Data
            const { beneficiaries, transfer_charge } = data.data;
            const tempBeneficiaryList = beneficiaries?.data || [];

            // Update Pagination & Data
            dispatch(setNextPageUrl(beneficiaries?.next_page_url || ""));
            dispatch(setBeneficiaryData(data));
            const authList =  getAuthorizationList();
            console.log('onSuccess')


            if (page == 1) {
                dispatch(setData(tempBeneficiaryList));
                // Set initial values
                const currency = getCurrencyOrUsername({ isCurrency: true });
                const currencySymbol = getCurrencyOrUsername({ isCurrency: true, isSymbol: true });

                dispatch(setLimits({ currency, currencySymbol, chargePerTrx: transfer_charge }));
                loadLimit(); // Ensure limits are set properly
            } else if (tempBeneficiaryList.length > 0) {
                dispatch(appendData(tempBeneficiaryList));
            }
            dispatch(incrementPage());
            if (isReset) {
                dispatch(batchUpdate({ page: 1 }));
            }
            if (authList.length > 0) {
                dispatch(setAuthorizationList(authList));
                dispatch(setSelectedAuthorization(authList[0]));
            }
            dispatch(setLoading(false));
            dispatch(setNextPageUrl(beneficiaries?.next_page_url || ""));
            dispatch(setBeneficiaryData(data));
        },
        retry: 0,
    });

    const loadMoreBeneficiary = async () => {
        console.log('wtf')
        dispatch(setLoading(true));
        await mutateAsync({ page });
    };

    const reloadBeneficiary = async () => {
        dispatch(setLoading(true));
        await mutateAsync({ page: 1 });
    };

    const hasNext = () => nextPageUrl !== "" && nextPageUrl !== "null";



    return { hasNext,loadMoreBeneficiary, beneficiaryList, nextPageUrl, beneficiaryData, reloadBeneficiary };
};

