import { useMutation } from "@tanstack/react-query";

import { useNavigation } from "@react-navigation/native";
import { signIn } from "../data/auth";
import { Routes } from "../constants";

interface LoginParams {
  email: string;
  password: string;
}

export const useAuth = () => {
  const navigation = useNavigation();

  const onAuthSuccess = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: Routes.main }],
    });
  };

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: LoginParams) => {
      try {
        const {
          data: { access_token },
        } = await signIn({ email, password });
      } catch (e) {
        console.log(e);
      }
    },
    onSuccess: onAuthSuccess,
  });

  const login = (params: LoginParams) => loginMutation.mutate(params);

  const logout = () => {};
  return {
    login,
    logout,
    isLoading: loginMutation.isPending,
  };
};
