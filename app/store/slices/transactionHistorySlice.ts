import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TransactionData, Remark } from '../../types/transactionHistory';

interface TransactionState {
  isLoading: boolean;
  transactionTypeList: string[];
  transactionList: TransactionData[];
  remarksList: Remark[];
  trxSearchText: string;
  nextPageUrl: string | null;
  page: number;
  index: number;
  currency: string;
  selectedRemark: string;
  selectedTrxType: string;
  filterLoading: boolean;
  isSearch: boolean;
  expandIndex: number;
  isBottomSheetVisible: boolean;
  selectedList: string[];
  bottomSheetTitle: string;
  callFrom: number;
}

const initialState: TransactionState = {
  isLoading: true,
  transactionTypeList: ['All', 'Plus', 'Minus'],
  transactionList: [],
  remarksList: [{ remark: 'All' }],
  trxSearchText: '',
  nextPageUrl: null,
  page: 1,
  index: 0,
  currency: '',
  selectedRemark: 'All',
  selectedTrxType: 'All',
  filterLoading: false,
  isSearch: false,
  expandIndex: -1,
  isBottomSheetVisible: false,
  selectedList: [],
  bottomSheetTitle: '',
  callFrom: 0,
};

const transactionHistorySlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {
        state.currency = action.payload;
      },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setTransactionList(state, action: PayloadAction<TransactionData[]>) {
      state.transactionList = action.payload;
    },
    appendTransactionList(state, action: PayloadAction<TransactionData[]>) {
      state.transactionList = [...state.transactionList, ...action.payload];
    },
    setRemarksList(state, action: PayloadAction<Remark[]>) {
      state.remarksList = action.payload;
    },
    setNextPageUrl(state, action: PayloadAction<string | null>) {
      state.nextPageUrl = action.payload;
    },
    incrementPage(state) {
      state.page += 1;
    },
    resetPage(state) {
      state.page = 1;
    },
    setTrxSearchText(state, action: PayloadAction<string>) {
      state.trxSearchText = action.payload;
    },
    setSelectedRemark(state, action: PayloadAction<string>) {
      state.selectedRemark = action.payload;
    },
    setSelectedTrxType(state, action: PayloadAction<string>) {
      state.selectedTrxType = action.payload;
    },
    setFilterLoading(state, action: PayloadAction<boolean>) {
      state.filterLoading = action.payload;
    },
    setExpandIndex(state, action: PayloadAction<number | null>) {
      state.expandIndex = action.payload === null ? -1 : action.payload;
    },
    toggleSearch(state) {
      state.isSearch = !state.isSearch;
    },
    openBottomSheet(state, action: PayloadAction<{ selectedList: string[]; bottomSheetTitle: string; callFrom: number }>) {
      state.isBottomSheetVisible = true;
      state.selectedList = action.payload.selectedList;
      state.bottomSheetTitle = action.payload.bottomSheetTitle;
      state.callFrom = action.payload.callFrom;
    },
    closeBottomSheet(state) {
      state.isBottomSheetVisible = false;
    },
  },
});

export const {
  setLoading,
  setCurrency,
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
  closeBottomSheet,
} = transactionHistorySlice.actions;

export default transactionHistorySlice.reducer;
