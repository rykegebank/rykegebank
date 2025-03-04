type URLSType = {
  baseUrl: string;
  signIn: string;
  signUp: string;
  allCountries: string;
  forgotPassword: string;
  dashboard: string;
  generalSettings: string;
  submitUser: string;
  verifyCode: string;
  resetPassword: string;
  verifyMobile: string;
  verifyEmail: string,
  resendEmail: string,
  transactions: string
  profileUpdate: string
  profileChangePassword: string
  referees: string
  faq: string
  policy: string
  language: string,
  referralLink: string
  depositHistory: string
  withdrawHistory: string
  notificationHistory: string
  myBankBeneficiaryUrl: string
  submitOtpUrl: string
  resendOtpUrl: string
  myBankTransferUrl: string,
  otherBeneficiaryUrl: string,
  otherBankTransfer: string
  wireTransferFormUrl:string
  wireTransferRequestUrl:string
};

export const URLS: URLSType = {
  baseUrl: "http://54.91.151.16/",
  signIn: "/login",
  signUp: "/register",
  allCountries: "/get-countries",
  forgotPassword: "/password/email",
  dashboard: "/dashboard",
  generalSettings: "/general-setting",
  submitUser: "/user-data-submit",
  verifyCode: "/password/verify-code",
  resetPassword: "/password/reset",
  verifyMobile: '/verify-mobile',
  verifyEmail: '/verify-email',
  resendEmail: '/password/email',
  transactions: '/transactions',
  profileUpdate: '/profile-setting',
  profileChangePassword: '/change-password',
  referees: '/referees',
  faq: '/faq',
  policy: '/policy-pages',
  language: '/language/',
  referralLink: '/referral-link',
  depositHistory: 'deposit/history',
  withdrawHistory: 'withdraw/history',
  notificationHistory: '/notification/history',
  myBankBeneficiaryUrl: '/beneficiary/own',
  submitOtpUrl: 'check/otp/',
  resendOtpUrl: 'resend/otp/',
  myBankTransferUrl: 'own/transfer/request/',
  otherBeneficiaryUrl: '/beneficiary/other',
  otherBankTransfer: '/other/transfer/request/',
  wireTransferFormUrl:'wire-transfer',
  wireTransferRequestUrl:'wire-transfer/request',
};
