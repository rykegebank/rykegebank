import { LanguageModel } from '../types/language';

const Strings = {
    balance: "Balance",
    noInternet: 'No internet connection',
    retry: "Retry",
    noDataFound: "No Data Found",
    deposit: "Deposit",
    fdr: "FDR",
    dps: "DPS",
    loan: "Loan",
    withdrawal: "Withdraw",
    transfer: "Transfer",
    transaction: "Transaction",
    referral: "Referral",
    latestTransaction: "Latest Transactions",
    loadingPleaseWait: "Loading, please wait...",
    home: "Home",
    menu: "Menu",
    profile: "Profile",
    remark: "Remark",
    transactionNo: "Transaction No",
    type:"Type",
    error: "Error",
    success: "Success",
    somethingWentWrong: "Something went wrong",
};

export const languages: LanguageModel[] = [
    {
      imageUrl: '',
      languageName: 'English',
      countryCode: 'US',
      languageCode: 'en',
    },
    {
      imageUrl: '',
      languageName: 'Arabic',
      countryCode: 'SA',
      languageCode: 'ar',
    },
  ];
  

export default Strings;