import { useMutation } from "@tanstack/react-query";

import { useNavigation } from "@react-navigation/native";
import { SignInParams, SignInResponse, signIn } from "../data/auth";
import { Routes } from "../constants";
import { Alert } from "react-native";

export const useAuth = () => {
  const navigation = useNavigation();

  const onAuthSuccess = (access_token: string) => {
    if (access_token) {
      navigation.reset({
        index: 0,
        routes: [{ name: Routes.home }],
      });
    } else {
      Alert.alert("Wrong username or password");
    }
  };

  const loginMutation = useMutation({
    mutationFn: async ({ username, password }: SignInParams) => {
      const { data } = await signIn({ username, password });

      return data?.data?.access_token;
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
