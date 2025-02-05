import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { IBankBeneficiaryResponseModel } from '../../types/beneficiary';
import { URLS } from '../../data/urls';
import api from '../../data/api';
import { manageApiException } from '../../utils/errorHandler';
import {
    setLoading,
    setData,
    appendData,
    setNextPageUrl,
    incrementPage,
    batchUpdate,
    setBeneficiaryData,
} from '../../store/slices/beneficiarySlice';
import {
    setBeneficiaryList,
    setLimits,
    setAuthorizationList,
    setSelectedAuthorization,
    toggleLimitShow,
} from "../../store/slices/myBankTransferSlice";

import { RootState } from '../../store';
import { useGeneralSettings } from "../../hooks/useGeneralSettings";
import { useMyBankTransfer } from '../../screens/TransferMyBank/hooks/useMyBankTransfer';

export const useBeneficiary = () => {
    const dispatch = useDispatch();
    const { getCurrencyOrUsername, getAuthorizationList } = useGeneralSettings();

    const { page, beneficiaryList, nextPageUrl, beneficiaryData } = useSelector((state: RootState) => state.beneficiary);
    // const { loadMoreBeneficiary, beneficiaryList, nextPageUrl, beneficiaryData } = useMyBankTransfer();

    const { mutateAsync } = useMutation({
        mutationFn: async ({ page, isReset = false }: { page: number; isReset?: boolean }) => {
            dispatch(setLoading(true));
            const url = `${URLS.myBankBeneficiaryUrl}?page=${page}`;
            const { data } = await api.get<IBankBeneficiaryResponseModel>(url);
            return data;
        },
        onError: (error) => {
            dispatch(setLoading(false));
            manageApiException(error);
        },
        onSuccess: (data, variables) => {
            const { page, isReset } = variables;
            dispatch(setLoading(false));

            if (data.status?.toLowerCase() === 'success') {
                dispatch(setNextPageUrl(data.data?.beneficiaries?.nextPageUrl || ''));
                dispatch(setBeneficiaryData(data));

                const tempBeneficiaryList = data.data?.beneficiaries?.data || [];

                if (page === 1) {
                    dispatch(setData(tempBeneficiaryList));
                    // set initial value 
                    const cur = getCurrencyOrUsername({ isCurrency: true });
                    const symbol = getCurrencyOrUsername({ isCurrency: true, isSymbol: true });
                    const authList = getAuthorizationList();
                    if (authList.length > 0) {
                        dispatch(setSelectedAuthorization(authList[0]));
                    }
                    
                    dispatch(setLimits({ currency: cur, currencySymbol: symbol }));

                } else if (tempBeneficiaryList.length > 0) {
                    dispatch(appendData(tempBeneficiaryList));
                }

                if (isReset) {
                    dispatch(batchUpdate({ page: 1, trxSearchText: '' }));
                }

                dispatch(incrementPage());
            } else {
                manageApiException(data.message);
            }
        },
        retry: 0,
    });

    const loadMoreBeneficiary = async () => {
        return await mutateAsync({ page });
    };

    return { loadMoreBeneficiary, beneficiaryList, nextPageUrl, beneficiaryData };
};
