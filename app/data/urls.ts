type URLSType = {
  baseUrl:string;
  signIn: string;
  signUp: string;
  allCountries: string;
  forgotPassword: string;
  dashboard: string;
  generalSettings: string;
};

export const URLS: URLSType = {
  baseUrl:"http://54.91.151.16/",
  signIn: "/login",
  signUp: "/register",
  allCountries: "/get-countries",
  forgotPassword: "/password/email",
  dashboard: "/dashboard",
  generalSettings: "/general-setting"
};
