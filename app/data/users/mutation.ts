import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import api from "../api";
import { URLS } from "../urls";
import { Alert } from "react-native";
import { Routes } from "../../constants";

export interface SignUpParams {
    email: string;
    password: string;
    password_confirmation: string;
    username: string;
    country_code: string;
    mobile_code: string;
    mobile: string;
    country: string;
    agree: number;
}

interface SignUpResponse {
    status: string
    message: {
        error: string[]
    }
    data: {
        access_token: string
    }
}


interface ForgotPasswordParams {
    value: string
}

interface ForgotPasswordResponse {
    data: any
}
export const useSignUp = () => {
    const navigation = useNavigation()
    return useMutation({
        mutationFn: async (params: SignUpParams) => {
            const {
                data
            } = await api.post<SignUpResponse>(URLS.signUp, params)

            return data
        },
        onSuccess: (data: SignUpResponse) => {
            if (data.status === 'success') {
                navigation.reset({
                    index: 0,
                    routes: [{ name: Routes.home }],
                  });
            } else {
                Alert.alert('Unable to register', data.message.error[0])
            }
        },
      });
} 


export const useForgotPassword = () => {
    const navigation = useNavigation()
    return useMutation({
        mutationFn: async (params: ForgotPasswordParams) => {

            const {
                data ,
            } = await api.post<ForgotPasswordResponse>(URLS.forgotPassword, {
                ...params
            })

            return data
            // console.log(data)
        
        },
        onSuccess: (data) => {
            if(data?.message?.error?.[0]) {

                Alert.alert(data?.message?.error?.[0])
            } else {

                Alert.alert('Code has been sent to your email')
                navigation.goBack()
            }
        },
    });
} 