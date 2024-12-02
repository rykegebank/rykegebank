import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setOffline } from "../../../hooks/internetSlice";
import api from "../../../data/api";
import { URLS } from "../../../data/urls";
import { DashboardResponseModel } from "../../../types/dashboard";
import { formatNumber } from "../../../utils/stringFormatHelper";
import { useGeneralSettings } from "../../../hooks/generalSettings";
import { manageApiException } from '../../../utils/errorHandler';

interface HomeData {
    username: string;
    email: string;
    balance: string;
    accountNumber: string;
    currency: string;
    currencySymbol: string;
    imagePath: string;
    debitsLists: any[];
}

export const useHomeQuery = () => {
    const dispatch = useDispatch();
    const { getCurrencyOrUsername } = useGeneralSettings();

    return useQuery<HomeData, Error>({
        queryKey: ["homeData"],
        queryFn: async () => {
            try {
                const response = await api.get(URLS.dashboard);
                const model = response.data as DashboardResponseModel;

                const debitsLists = [
                    ...(model.data?.latest_credits?.data?.map((credit) => ({
                        ...credit,
                        remark: credit.details,
                    })) || []),
                    ...(model.data?.latest_debits?.data || []),
                ];
                const currency = getCurrencyOrUsername({ isCurrency: true });
                const currencySymbol = getCurrencyOrUsername({ isCurrency: true, isSymbol: true });

                return {
                    username: model.data?.user?.username || "",
                    email: model.data?.user?.email || "",
                    accountNumber: model.data?.user?.account_number || "",
                    imagePath: model.data?.user?.image || "",
                    balance: formatNumber(model.data?.user?.balance || ""),
                    currency: currency,
                    currencySymbol: currencySymbol,
                    debitsLists,
                };
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || error.message || "An error occurred";
                if (error.response?.status === 503) {
                    dispatch(setOffline(true));
                }
                manageApiException(error);
                throw new Error(errorMessage);
            }
        }

    });
};
