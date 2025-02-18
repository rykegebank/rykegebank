type RoutesType = {
  splash: string;
  login: string;
  home: string;
  main: string;
  deposit: string;
  fdr: string;
  dps: string;
  loan: string;
  withdraw: string;
  transfer: string;
  transaction: string;
  referral: string;
  profile: string;
  menu: string;
  register: string;
  forgotPassword: string;
  completeProfile: string;
  codeVerification: string
  resetPassword: string
  profileChangePassword: string
  notificationList: string
  faqs: string
  privacy: string
  transactionDetails: string
  depositDetails: string
  transferMyBank: string
  wireTransfer: string
  transferHistory: string
  otp: string
  tranferOtherBank: string
};

const Routes: RoutesType = {
  splash: "Splash",
  login: "Login",
  home: "Home",
  main: "Main",
  deposit: "Deposit",
  fdr: "Fdr",
  dps: "Dps",
  loan: "Loan",
  withdraw: "Withdraw",
  transfer: "Transfer",
  transaction: "Transaction",
  referral: "Referral",
  profile: "Profile",
  menu: "Menu",
  register: "Register",
  forgotPassword: "ForgotPassword",
  completeProfile: "completeProfile",
  codeVerification: "CodeVerification",
  resetPassword: "resetPassword",
  profileChangePassword: "profileChangePassword",
  notificationList: "notificationList",
  faqs: "faqs",
  privacy: 'privacy',
  transactionDetails: 'transactionDetails',
  depositDetails: 'depositDetails',
  transferHistory: 'transferHistory',
  transferMyBank: 'transferMyBank',
  wireTransfer: 'wireTransfer',
  otp: 'otp',
  tranferOtherBank: 'transferOtherBank'
};

export default Routes;
