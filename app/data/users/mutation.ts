import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import api from "../api";
import { URLS } from "../urls";
import { Alert } from "react-native";
import { Routes } from "../../constants";
import { setAccessToken } from "../../logic/token";

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

interface SignUpData {
    access_token: string
}

interface ForgotPasswordParams {
    value: string
}

interface ForgotPasswordResponse {
    status: string
    message: {
        error: string[]
    }
}
interface VerifyCodeParams {
    code: string
    email: string
}

interface VerfiyCodeResponse {
    status: string
    message: {
        error: string[]
    }
}

interface ResetPasswordParams {

    token: string
    email: string
    password: string
    password_confirmation: string
}

interface ResetPasswordResponse { 
    
    status: string
    message: {
        error: string[]
    }
}

export const useSignUp = () => {
    const navigation = useNavigation()
    return useMutation({
        mutationFn: async (params: SignUpParams) => {

            const {
                data
            } = await api.post<SignUpResponse>(URLS.signUp, {
                ...params
            })
            
            return data

        },
        onSuccess: async (data: SignUpResponse) => {
            if (data.status === 'success') {
                await setAccessToken(data.data.access_token)
                navigation.navigate(Routes.completeProfile)

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

            return {
                ...data, email: params.value
            }      // console.log(data)
        
        },
        onSuccess: (data) => {
            if(data.status === 'success') {
                navigation.navigate(Routes.forgotPasswordVerification, {
                    email: data.email
                })

            } else {

                Alert.alert(JSON.stringify(data.message))
            }
        },
    });
} 


export const useVerifyCode = () => {
    const navigation = useNavigation()
    return useMutation({
        mutationFn: async (params: VerifyCodeParams) => {
            console.log(params)

            const {
                data ,
            } = await api.post<VerfiyCodeResponse>(URLS.verifyCode, {
                ...params
            })

            return {
                ...data, code: params.code, email: params.email
            }
        },
            // console.log(data)
        
    
        onSuccess: (data) => {
            if(data.status === 'success') {
                navigation.navigate(Routes.resetPassword, {
                    token: data.code,
                    email: data.email
                })

            } else {

                Alert.alert(JSON.stringify(data.message))
            }
        },
    });
} 



export const useResetPassword = () => {
    const navigation = useNavigation()
    return useMutation({
        mutationFn: async (params: ResetPasswordParams) => {
            console.log(params)

            const {
                data ,
            } = await api.post<ResetPasswordResponse>(URLS.resetPassword, {
                ...params
            })

            return data
        },
            // console.log(data)
        
    
        onSuccess: (data) => {
            if(data.status === 'success') {
                navigation.reset({
                    index: 0,
                    routes: [{ name: Routes.login }],
                  });

            } else {

                Alert.alert(JSON.stringify(data.message))
            }
        },
    });
} 
