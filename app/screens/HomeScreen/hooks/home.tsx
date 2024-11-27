import { useQuery } from "@tanstack/react-query";
import api from "../../../data/api";
import { URLS } from "../../../data/urls";
import { DashboardResponseModel } from "../../../data/dashboard";
import { formatNumber } from "../../../utils/stringFormatHelper";
import { useGeneralSettings } from "../../../hooks/generalSettings";

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

// Fetch Function with useQuery
export const useHomeQuery = () => {
    const { getCurrencyOrUsername } = useGeneralSettings();

    return useQuery<HomeData>({
        queryKey: ['homeData'],
        queryFn: async () => {
            try {
                const response = await api.get(URLS.dashboard);
                const model = response.data as DashboardResponseModel;

                console.log('model ', model);
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
                if (error.response?.status === 503) {
                    throw new Error("No internet connection");
                }
                throw new Error(error?.response?.data?.message || error.message || "An error occurred");
            }
        },
    });
};
