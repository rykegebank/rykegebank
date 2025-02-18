import { LanguageModel } from '../types/language';

const Strings = {
  appName: "MXBank",
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
  type: "Type",
  error: "Error",
  success: "Success",
  somethingWentWrong: "Something went wrong",
  transferWithinBank: function () {
    return `Transfer within ${this.appName}`;
  },
  vBankBeneficiaries: "MXBank Benificiaries",
  otherBankBeneficiaries: "Other Bank Benificiaries",
  otherBanks: "Other Banks",
  wireTransfer: "Wire Transfer",
  transferHistory: "Transfer History",
  next: "Next",
  requestFailed: "Request Failed",
  invalidAmount: "Invalid Amount",
  selectAuthModeMsg: "Please select an authorization mode",
  charge: "Charge",
  transferLimit: "Transfer Limit",
  perTransaction: "Per Transaction",
  dailyMaximum: "Daily Maximum",
  dailyMax: "Daily Maximum",
  monthlyMaximum: "Monthly Maximum",
  monthlyMax: "Monthly Maximum",
  dailyAvailable: "Daily Available",
  availableBalance: "Available Balance",
  dailyMaxTrx: "Daily Maximum TRX",
  monthlyMinTrx: "Monthly Maximum TRX",

  amount: "Amount",
  enterAmount: "Enter Amount",
  authorizationMethod: "Authorization Method",
  chooseFile: "Choose File",
  submit: "Submit",


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