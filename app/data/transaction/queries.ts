import { useQuery } from '@tanstack/react-query';
import api from '../api';
import { URLS } from '../urls';
import { TransactionResponse } from '../../types/transactionHistory';
import { manageApiException } from '../../utils/errorHandler';

// Modify this to handle async correctly
export const fetchTransactionHistory = async (
    page: number,
    type: string = "",
    remark: string = "",
    searchText: string = "",
    walletType: string = ""
): Promise<TransactionResponse> => {
    try {
        if (type.toLowerCase() === 'all' || (type.toLowerCase() !== 'plus' && type.toLowerCase() !== 'minus')) {
            type = '';
        }
        if (!remark || remark.toLowerCase() === 'all') {
            remark = '';
        }
        let url = `${URLS.transactions}?page=${page}&type=${type}&remark=${remark}&search=${searchText}`;
        // if (type) url += `&type=${type}`;
        // if (remark) url += `&remark=${remark}`;
        // if (searchText) url += `&search=${searchText}`;
        // if (walletType) url += `&walletType=${walletType}`;
        console.log('url test', url);

        const response = await api.get(url);
        console.log('response', response.data);
        return response.data;
    } catch (error: any) {
        manageApiException(error);
        console.error('Error fetching transaction history:', error.message || 'Unknown error');
        throw new Error(error.message || 'Failed to fetch transaction history');
    }
};

// Now using fetchTransactionHistory in useQuery
export const useTransactionHistoryQuery = (
    page: number,
    type: string = "",
    remark: string = "",
    searchText: string = "",
    walletType: string = ""
) => {
    return useQuery<TransactionResponse, Error>({
        queryKey: ['transactionHistory', page, type, remark, searchText, walletType],
        queryFn: () => fetchTransactionHistory(page, type, remark, searchText, walletType),
        retry: 0,
        staleTime: 10000,
        gcTime: 0,
        enabled: false
    });
};
