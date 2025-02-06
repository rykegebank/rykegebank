import { useDispatch } from "react-redux";
import {
    setSelectedAuthorization,
    toggleLimitShow,
} from "../../../store/slices/myBankTransferSlice";

import { useBeneficiary } from "../../../data/beneficiary/mutation";

export const useMyBankTransfer = () => {
    const dispatch = useDispatch();
    const { loadMoreBeneficiary, nextPageUrl } = useBeneficiary();

    const changeAuthorizationMode = (value?: string) => {
        if (value) {
            dispatch(setSelectedAuthorization(value));
        }
    };

    const loadPaginationData = async () => {
        await loadMoreBeneficiary();
    };

    const hasNext = () => nextPageUrl != "" && nextPageUrl != "null";

    const handleToggleLimitShow = () => {
        dispatch(toggleLimitShow());
    };

    return {
        changeAuthorizationMode,
        loadPaginationData,
        hasNext,
        handleToggleLimitShow,
    };
};
