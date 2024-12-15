import { useMutation } from "@tanstack/react-query";

import { useNavigation } from "@react-navigation/native";
import { SignInParams, SignInResponse, signIn } from "../data/auth";
import { Routes } from "../constants";
import { Alert } from "react-native";
import { setAccessToken } from "../logic/token";
import { useAppDispatch } from "../store";
import {
  setEmail,
  setIsAuthenticated,
  setIsEmailVerified,
  setIsProfileCompleted,
  setIsSmsVerified,
  setMobile,
  setUser,
} from "../store/slices/userSlice";
import {
  isForEmailVerification,
  isForSmsVerification,
  isVerified,
} from "../utils/users";

export const useAuth = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const onAuthSuccess = async (data: any) => {
    console.log("onAuthSuccess");
    if (data.status === "success") {
      const { user, access_token, profile_complete } = data.data;
      const { ev, sv, email, mobile } = user;
      await setAccessToken(access_token);
      dispatch(setUser(user));
      dispatch(setIsAuthenticated(true));
      dispatch(setIsEmailVerified(ev));
      dispatch(setIsSmsVerified(sv));
      dispatch(setIsProfileCompleted(profile_complete));
      dispatch(setEmail(email));
      dispatch(setMobile(mobile));

      if (isVerified(user)) {
        if (profile_complete === 0) {
          console.log("logging in -> incomplete profile");
          navigation.reset({
            index: 0,
            routes: [{ name: Routes.completeProfile }],
          });
        } else {
          console.log("logging in -> complete profile");
          navigation.reset({
            index: 0,
            routes: [{ name: Routes.main }],
          });
        }
      } else {
        console.log("logging in -> for verificaiton");
        navigation.navigate(Routes.codeVerification);
      }
    } else {
      throw "Wrong username or password.";
    }
  };

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: SignInParams) => {
      const { data } = await signIn({ username, password });

      return data;
    },
    onSuccess: onAuthSuccess,
  });

  const login = (params: SignInParams) => loginMutation.mutate(params);

  const logout = () => {};
  return {
    login,
    logout,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
};
