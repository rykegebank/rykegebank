import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { RootState } from '../../../store';
import {
    setLoading,
    setTransactionList,
    appendTransactionList,
    setRemarksList,
    setNextPageUrl,
    incrementPage,
    batchUpdate,
    setSelectedRemark,
    setSelectedTrxType,
    setExpandIndex,
    toggleSearch,
    openBottomSheet,
    closeBottomSheet,
    setCurrency,
} from '../../../store/slices/transactionHistorySlice';
import api from '../../../data/api';
import { TransactionResponse } from '../../../types/transactionHistory';
import { URLS } from '../../../data/urls';
import { useGeneralSettings } from "../../../hooks/useGeneralSettings";
import { manageApiException } from '../../../utils/errorHandler';

export const useTransactionHistory = () => {
    const state = useSelector((state: RootState) => state.transactionHistory);
    const dispatch = useDispatch();
    const { getCurrencyOrUsername } = useGeneralSettings();

    const { mutate } = useMutation({
        mutationFn: async ({
            page,
            selectedTrxType,
            selectedRemark,
            trxSearchText,
            isReset = false,
        }: {
            page: number;
            selectedTrxType: string;
            selectedRemark: string;
            trxSearchText: string;
            isReset?: boolean;
        }) => {
            const type =
                selectedTrxType.toLowerCase() === 'all' ||
                    (selectedTrxType.toLowerCase() !== 'plus' && selectedTrxType.toLowerCase() !== 'minus')
                    ? ''
                    : selectedTrxType.toLowerCase();

            const remark = selectedRemark.toLowerCase() === 'all' ? '' : selectedRemark;
            if (trxSearchText == undefined) {
                trxSearchText = '';
            }
            const url = `${URLS.transactions}?page=${page}&type=${type}&remark=${remark}&search=${trxSearchText}`;
            console.log('url', url, state.isLoading);
            const { data } = await api.get<TransactionResponse>(url);
            return data;
        },
        retry: 0,
        onError: (error) => {
            dispatch(setLoading(false));
            console.error('Error fetching transactions:', error);
            manageApiException(error);
        },
        onSuccess: (data, variables) => {
            const { page, selectedTrxType, selectedRemark, trxSearchText, isReset } = variables;

            console.log('API call successful, data:', data);
            if (data.status === 'success') {
                const { transactions, remarks } = data.data;
                const transactionData = transactions?.data || [];
                const nextPageUrl = transactions?.next_page_url || null;
                console.log('transactionData');
                if (page === 1) {
                    console.log('Setting transaction list for page 1');
                    dispatch(setCurrency(getCurrencyOrUsername({ isCurrency: true, isSymbol: true }) || ""));
                    dispatch(setTransactionList(transactionData)); // multiple dispatch causes mutate to be called again
                    dispatch(setRemarksList([{ remark: 'All' }, ...(remarks ?? [])]));
                } else {
                    console.log('Appending transaction list');
                    dispatch(appendTransactionList(transactionData));
                }

                if (isReset) {
                    dispatch(batchUpdate({
                        page: 1,
                        trxSearchText: '',
                    }));
                }

                dispatch(setNextPageUrl(nextPageUrl));
                dispatch(incrementPage());
                dispatch(setLoading(false));

            } else {
                manageApiException(data.message);
            }
        },
    });

    const filterData = (search: string) => {
        console.log('Filtering data with search text:', search);
        dispatch(setLoading(true));
        mutate({
            page: 1,
            selectedTrxType: state.selectedTrxType,
            selectedRemark: state.selectedRemark,
            trxSearchText: search,
            isReset: true
        });
    };

    const loadMore = () => {
        console.log('Loading more transactions, current page:', state.page);
        if (state.nextPageUrl) {
            mutate({
                page: state.page,
                selectedTrxType: state.selectedTrxType,
                selectedRemark: state.selectedRemark,
                trxSearchText: state.trxSearchText,
            });
        }
    };

    const changeSearchIcon = () => {
        console.log('Toggling search icon visibility');
        dispatch(toggleSearch());
    };

    const openFilterBottomSheet = (filterType: string) => {
        console.log('Opening filter bottom sheet with filter type:', filterType);
        const selectedList =
            filterType === 'type'
                ? state.transactionTypeList
                : state.remarksList.map((remark) => remark.remark);
        const bottomSheetTitle = filterType === 'type' ? 'Transaction Type' : 'Remarks';
        const callFrom = filterType === 'type' ? 1 : 2;

        dispatch(openBottomSheet({ selectedList, bottomSheetTitle, callFrom }));
    };

    const onSelectBottomSheetItem = (selectedValue: string) => {
        console.log('Selected value from bottom sheet:', selectedValue);
        dispatch(closeBottomSheet());

        if (state.callFrom === 1) {
            dispatch(setSelectedTrxType(selectedValue));
        } else if (state.callFrom === 2) {
            dispatch(setSelectedRemark(selectedValue));
        }
    };

    const closeBottomSheetAction = () => {
        console.log('Closing bottom sheet without changes');
        dispatch(closeBottomSheet());
    };

    const changeExpandIndex = (index: number | null) => {
        console.log('Changing expand index to:', index);
        dispatch(setExpandIndex(index === null ? -1 : index));
    };

    const initializeTransactions = () => {
        console.log('Initializing transactions');
        mutate({
            page: 1,
            selectedTrxType: state.selectedTrxType,
            selectedRemark: state.selectedRemark,
            trxSearchText: state.trxSearchText,
        });
    };

    return {
        filterData,
        loadMore,
        initializeTransactions,
        changeSearchIcon,
        openFilterBottomSheet,
        onSelectBottomSheetItem,
        closeBottomSheetAction,
        changeExpandIndex,
    };
};
