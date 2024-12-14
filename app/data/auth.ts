import api from "./api";
import { URLS } from "./urls";

export interface SignInParams {
  username: string;
  password: string;
}


export interface SignInResponse {
  status: string,
  data: {
    data: {
      access_token: string;
      profile_complete: number;
    };
  }
}

export const signIn = (params: SignInParams): Promise<SignInResponse> =>
  api.post(URLS.signIn, params);

