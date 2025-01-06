import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import {
  setLoading,
  setTransactionList,
  appendTransactionList,
  setRemarksList,
  setNextPageUrl,
  incrementPage,
  resetPage,
  setTrxSearchText,
  setSelectedRemark,
  setSelectedTrxType,
  setFilterLoading,
  setExpandIndex,
  toggleSearch,
  openBottomSheet,
  setCurrency,
  closeBottomSheet,
} from '../../../store/slices/transactionHistorySlice';
import { useTransactionHistoryQuery } from '../../../data/transaction/queries';
import { useGeneralSettings } from '../../../hooks/useGeneralSettings';
import { useEffect, useCallback, useRef } from 'react';

export const useTransactionHistory = () => {
  const state = useSelector((state: RootState) => state.transactionHistory);
  const dispatch = useDispatch();
  const { data, refetch, isLoading, isSuccess, error } = useTransactionHistoryQuery(
    state.page,
    state.selectedTrxType,
    state.selectedRemark,
    state.trxSearchText
  );
  const { getCurrencyOrUsername } = useGeneralSettings();
  
  // Track if transactions have already been loaded
  const hasLoaded = useRef(false);

  const loadTransactions = useCallback(async () => {
    if (!data) {
      console.error('Data is undefined. Check your query response.');
      return;
    }

    dispatch(setLoading(true));
    console.log('Fetching transactions...');

    try {
      const { transactions, remarks } = data?.data ?? {};
      const transactionData = transactions?.data || [];
      const nextPageUrl = transactions?.next_page_url || null;

      if (state.page === 1) {
        dispatch(setFilterLoading(true));
        const currency = getCurrencyOrUsername({ isCurrency: true }) || '';
        dispatch(setCurrency(currency));
        dispatch(setTransactionList(transactionData));
        dispatch(setRemarksList([{ remark: 'All' }, ...(remarks ?? [])]));
      } else {
        dispatch(appendTransactionList(transactionData));
      }
      dispatch(setLoading(false));
      dispatch(setFilterLoading(false));
      dispatch(setNextPageUrl(nextPageUrl));
      dispatch(incrementPage());

      console.log('Transactions:',nextPageUrl);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [data, dispatch, getCurrencyOrUsername, state.page]);

  // Use effect to load transactions only once
  useEffect(() => {
    if (isSuccess && data && !hasLoaded.current) {
      hasLoaded.current = true; // Mark as loaded
      loadTransactions();
      console.log('use effect')
    }
  }, [isSuccess, data, loadTransactions]); // Dependencies remain, but the flag ensures it's only called once

  // Filter Transactions
  const filterData = async(search: string) => {
    dispatch(setTrxSearchText(search));
    dispatch(resetPage());
    dispatch(setFilterLoading(true));
    await refetch(); 
    dispatch(setFilterLoading(false));
  };

  // Toggle Search Icon
  const changeSearchIcon = () => {
    dispatch(toggleSearch());
  };

  // Change Selected Remark
  const changeSelectedRemark = (remark: string) => {
    dispatch(setSelectedRemark(remark));
  };

  // Change Selected Transaction Type
  const changeSelectedTrxType = (type: string) => {
    dispatch(setSelectedTrxType(type));
  };

  // Change Search Text
  const changeTrxSearchText = (search: string) => {
    dispatch(setTrxSearchText(search));
  };

  // Open Filter Bottom Sheet
  const openFilterBottomSheet = (filterType: string) => {
    let selectedList = [];
    let bottomSheetTitle = '';
    let callFrom = 0;

    if (filterType === 'type') {
      selectedList = state.transactionTypeList;
      bottomSheetTitle = 'Transaction Type';
      callFrom = 1;
    } else if (filterType === 'remark') {
      selectedList = state.remarksList.map((remark) => remark.remark);
      bottomSheetTitle = 'Remarks';
      callFrom = 2;
    }

    dispatch(openBottomSheet({ selectedList, bottomSheetTitle, callFrom }));
  };

  // Close Bottom Sheet
  const closeBottomSheetAction = () => {
    dispatch(closeBottomSheet());
  };

  // Select an Item from Bottom Sheet
  const onSelectBottomSheetItem = (selectedValue: string) => {
    dispatch(closeBottomSheet());
    if (state.callFrom === 1) {
      changeSelectedTrxType(selectedValue);
    } else if (state.callFrom === 2) {
      changeSelectedRemark(selectedValue);
    }
  };

  // Change Expand Index
  const changeExpandIndex = (index: number | null) => {
    dispatch(setExpandIndex(index === null ? -1 : index));
  };

  return {
    state,
    loadTransactions,
    filterData,
    changeSearchIcon,
    changeSelectedRemark,
    changeSelectedTrxType,
    changeTrxSearchText,
    openFilterBottomSheet,
    closeBottomSheetAction,
    onSelectBottomSheetItem,
    changeExpandIndex,
    isLoading,
    error,
  };
};
