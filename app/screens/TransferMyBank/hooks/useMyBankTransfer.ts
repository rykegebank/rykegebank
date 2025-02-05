import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
    setLoading,
    setBeneficiaryList,
    setLimits,
    setAuthorizationList,
    setSelectedAuthorization,
    toggleLimitShow,
} from "../../../store/slices/myBankTransferSlice";

import { useBeneficiary } from '../../../data/beneficiary/mutation';
import { useGeneralSettings } from "../../../hooks/useGeneralSettings";

export const useMyBankTransfer = () => {
    const dispatch = useDispatch();
    const bankState = useSelector((state: RootState) => state.myBankTransfer);
    const beneficiaryState = useSelector((state: RootState) => state.myBankTransfer);
    const { generalSetting } = useGeneralSettings();
    const { loadMoreBeneficiary, nextPageUrl, beneficiaryData } = useBeneficiary();

    const changeAuthorizationMode = (value?: string) => {
        if (value) {
            dispatch(setSelectedAuthorization(value));
        }
    };

    const loadPaginationData = async () => {
        await loadMoreBeneficiary();
    };

    const loadLimit = () => {
        dispatch(
            setLimits({
                chargePerTrx: beneficiaryData?.data?.transferCharge ?? "",
                limitPerTrx: generalSetting?.minimum_transfer_limit ?? "0",
                dailyMaxLimit: generalSetting?.daily_transfer_limit ?? "0",
                monthlyLimit: generalSetting?.monthly_transfer_limit ?? "0",
            })
        );
    };

    const hasNext = () => nextPageUrl != "" && nextPageUrl != "null";

    const handleToggleLimitShow = () => {
        dispatch(toggleLimitShow());
    };

    return {
        bankState,
        beneficiaryState,
        changeAuthorizationMode,
        loadPaginationData,
        loadLimit,
        hasNext,
        handleToggleLimitShow,
    };
};
