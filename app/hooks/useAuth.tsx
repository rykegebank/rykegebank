import { useMutation } from "@tanstack/react-query";

import { useNavigation } from "@react-navigation/native";
import { SignInParams, SignInResponse, signIn } from "../data/auth";
import { Routes } from "../constants";
import { Alert } from "react-native";
import { setAccessToken } from "../logic/token";

export const useAuth = () => {
  const navigation = useNavigation();

  const onAuthSuccess = async (data: any) => {
    if (data.access_token) {
      await setAccessToken(data.access_token);
      if (data.user.profile_complete === 0) {
        navigation.reset({
          index: 0,
          routes: [{ name: Routes.completeProfile }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: Routes.main }],
        });
      }
    } else {
      Alert.alert("Wrong username or password");
    }
  };

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: SignInParams) => {
      const { data } = await signIn({ username, password });

      return data?.data;
    },
    onSuccess: onAuthSuccess,
  });

  const login = (params: SignInParams) => loginMutation.mutate(params);

  const logout = () => {};
  return {
    login,
    logout,
    isLoading: loginMutation.isPending,
  };
};
