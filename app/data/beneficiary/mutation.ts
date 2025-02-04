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
    batchUpdate
} from '../../store/slices/beneficiarySlice';
import { RootState } from '../../store';

export const useBeneficiary = () => {
    const dispatch = useDispatch();
    const { page, beneficiaryList, nextPageUrl } = useSelector((state: RootState) => state.beneficiary);

    const { mutateAsync } = useMutation({
        mutationFn: async ({ page, isReset = false }: { page: number, isReset?: boolean }) => {
            dispatch(setLoading(true));
            const url = `${URLS.language}?page=${page}`;
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

            if (data.status?.toLowerCase() === "success") {
                dispatch(setNextPageUrl(data.data?.beneficiaries?.nextPageUrl || ""));
                const tempBeneficiaryList = data.data?.beneficiaries?.data || [];

                if (page === 1) {
                    dispatch(setData(tempBeneficiaryList));
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
        mutateAsync({ page });
    };

    return { loadMoreBeneficiary, beneficiaryList, nextPageUrl };
};
