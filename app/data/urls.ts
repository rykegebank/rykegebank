type URLSType = {
  signIn: string;
  signUp: string;
  allCountries: string;
  forgotPassword: string;
};

export const URLS: URLSType = {
  signIn: "/login",
  signUp: "/register",
  allCountries: "/get-countries",
  forgotPassword: "/password/email" 
};
