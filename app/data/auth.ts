import api from "./api";
import { URLS } from "./urls";

interface SignInParams {
  email: string;
  password: string;
}


interface SignInResponse {
  data: {
    access_token: string;
  };
}

export const signIn = ({
  email,
  password,
}: SignInParams): Promise<SignInResponse> =>
  api.post(URLS.signIn, {
    email,
    password,
  });

