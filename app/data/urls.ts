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
  resendEmail: string
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

};
