import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setOffline } from "../../../store/slices/internetSlice";
import api from "../../../data/api";
import { URLS } from "../../../data/urls";
import { DashboardResponseModel } from "../../../types/dashboard";
import { formatNumber } from "../../../utils/stringFormatHelper";
import { useGeneralSettings } from "../../../hooks/useGeneralSettings";
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
                // Combine and sort debits and credits by created_at
                const debitsLists = [
                    ...(model.data?.latest_credits?.data?.map((credit) => ({
                        ...credit,
                        remark: credit.details || "", // Fallback for missing details
                    })) || []),
                    ...(model.data?.latest_debits?.data || []),
                ].sort((a, b) => {
                    const dateA = new Date(a.created_at || "").getTime();
                    const dateB = new Date(b.created_at || "").getTime();
                    return dateB - dateA;
                });

                const currency = getCurrencyOrUsername({ isCurrency: true }) || "";
                const currencySymbol = getCurrencyOrUsername({ isCurrency: true, isSymbol: true }) || "";

                return {
                    username: model.data?.user?.username || "N/A",
                    email: model.data?.user?.email || "N/A",
                    accountNumber: model.data?.user?.account_number || "N/A",
                    imagePath: model.data?.user?.image || "",
                    balance: formatNumber(model.data?.user?.balance || "0"),
                    currency,
                    currencySymbol,
                    debitsLists,
                };
            } catch (error: any) {
                if (error.response?.status === 503 || error.message.includes('Network Error')) {
                    dispatch(setOffline(true));
                }
                await manageApiException(error);
                throw new Error("An error occurred");
            }
        },
        retry: 0,

    });
};
