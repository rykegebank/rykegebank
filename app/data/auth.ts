import api from "./api";
import { URLS } from "./urls";

export interface SignInParams {
  username: string;
  password: string;
}


export interface SignInResponse {
  data: {
    data: {
      access_token: string;
    };
  }
}

export const signIn = (params: SignInParams): Promise<SignInResponse> =>
  api.post(URLS.signIn, params);

