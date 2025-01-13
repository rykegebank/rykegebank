import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import api from "../api";
import { URLS } from "../urls";
import { Alert } from "react-native";
import { Routes } from "../../constants";
import { getAccessToken, setAccessToken } from "../../logic/token";
import { useAppDispatch, useAppSelector } from "../../store";
import { setEmail, setIsAuthenticated, setIsEmailVerified, setIsProfileCompleted, setIsSmsVerified, setMobile, setUser } from "../../store/slices/userSlice";
import { startCountdown } from "../../hooks/userHook";
import toasts from "../../logic/toasts";

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
        user: any
    }
}


interface ForgotPasswordParams {
    value: string
}

interface ForgotPasswordResponse {
    status: string
    message: {
        error: string[]
    }
    data: {
        email: string
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

interface VerfiyParams {
    code: string
}

interface ResendParams {
    value: string
}

interface ResetPasswordParams {

    token: string
    email: string
    password: string
    password_confirmation: string
}

interface ProfileChangePasswordParams {
    current_password: string
    password: string
    password_confirmation: string
}


interface RykegeApiResponse {
    status: string
    message: {
        error: string[]
    }
}
interface ResetPasswordResponse {

    status: string
    message: {
        error: string[]
    }
}

const error = {
    status: "error"
}
export const useSignUp = () => {
    const navigation = useNavigation()
    const dispatch = useAppDispatch();
    return useMutation({
        mutationFn: async (params: SignUpParams) => {
            if (params.agree === 0) {
                throw new Error("You must agree with our privacy & policies.")
            }

            const {
                data
            } = await api.post<SignUpResponse>(URLS.signUp, {
                ...params
            })

            return data

        },
        onError: (error: Error) => {
            toasts.genericErrorToast(error.message)
        },
        onSuccess: async (data: SignUpResponse) => {
            if (data.status === 'success') {
                const { user, access_token } = data.data
                const { ev, sv, email, mobile } = user;
                await setAccessToken(access_token)
                dispatch(setIsAuthenticated(true))
                dispatch(setUser(user))
                dispatch(setIsEmailVerified(ev))
                dispatch(setIsSmsVerified(sv))
                dispatch(setIsProfileCompleted(0))
                dispatch(setEmail(email))
                dispatch(setMobile(mobile))
                dispatch(startCountdown(120))
                navigation.navigate(Routes.codeVerification)
            } else {
                throw new Error(data.message?.error?.[0] ?? 'Unable to register')
            }
        },
    });
}


export const useForgotPassword = () => {
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    return useMutation({
        mutationFn: async (params: ForgotPasswordParams) => {

            const {
                data,
            } = await api.post<ForgotPasswordResponse>(URLS.forgotPassword, {
                ...params
            })

            return data

        },
        onSuccess: (data) => {
            if (data.status === 'success') {

                dispatch(setEmail(data.data.email))

                toasts.genericSuccessToast("Password reset email sent to " + data.data.email)
                dispatch(startCountdown(120))
                navigation.navigate(Routes.codeVerification, { forForgotPassword: true })

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
                data,
            } = await api.post<VerfiyCodeResponse>(URLS.verifyCode, {
                ...params
            })

            return {
                ...data, code: params.code, email: params.email
            }
        },

        onSuccess: (data) => {
            console.log('dataa', data)
            if (data.status === 'success') {
                navigation.navigate(Routes.resetPassword, {
                    token: data.code,
                    email: data.email
                })
            } else {
                Alert.alert('Verification code is incorrect. Please try again')
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
                data,
            } = await api.post<ResetPasswordResponse>(URLS.resetPassword, {
                ...params
            })

            return data
        },
        // console.log(data)


        onSuccess: (data) => {
            if (data.status === 'success') {

                toasts.genericSuccessToast("Password changed successfully")
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




export const useVerifyEmail = () => {
    const navigation = useNavigation()
    const dispatch = useAppDispatch();
    const { profile_complete } = useAppSelector(state => state.user)
    return useMutation({
        mutationFn: async (params: VerfiyParams) => {
            console.log(params)

            const {
                data,
            } = await api.post<RykegeApiResponse>(URLS.verifyEmail, {
                ...params
            })

            return data
        },


        onSuccess: async (data) => {
            console.log('email verification result -> ', data)
            if (data.status === 'success') {
                dispatch(setIsEmailVerified(1))

                toasts.genericSuccessToast("Registration successful")
                if (profile_complete === 0) {
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
                Alert.alert('Verification code is incorrect. Please try again')
            }
        }
    });
}


export const useVerifySms = () => {
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const { profile_complete } = useAppSelector(state => state.user)
    return useMutation({
        mutationFn: async (params: VerfiyParams) => {
            console.log(params)

            const {
                data,
            } = await api.post<RykegeApiResponse>(URLS.verifyMobile, {
                ...params
            })

            return data
        },


        onSuccess: (data) => {
            if (data.status === 'success') {
                console.log(data)
                dispatch(setIsSmsVerified(1))

                toasts.genericSuccessToast("Registration successful")
                if (profile_complete === 0) {
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
                Alert.alert('Verification code is incorrect. Please try again')
            }
        },
    });
}

export const useResendSms = () => {
    const dispatch = useAppDispatch()
    return useMutation({
        mutationFn: async (params: ResendParams) => {
            console.log(URLS.resendEmail, params)

            const {
                data,
            } = await api.post<RykegeApiResponse>(URLS.resendEmail, {
                ...params
            })

            return data
        },


        onSuccess: (data) => {
            console.log(data)
            if (data.status === 'success') {
                toasts.genericSuccessToast("Verification code sent successfully")
                dispatch(startCountdown(120))
            } else {
                Alert.alert('Unable to send erification code.')
            }
        },
    });
} 



export const useChangeProfilePassword = () => {
    const navigation = useNavigation()
    return useMutation({
        mutationFn: async (params: ProfileChangePasswordParams) => {
            console.log(params)

            const {
                data,
            } = await api.post<ResetPasswordResponse>(URLS.profileChangePassword, {
                ...params
            })

            return data
        },


        onSuccess: (data) => {
            if (data.status === 'success') {
     
                toasts.genericSuccessToast("Password changed successfully!")
                 navigation.goBack()
               

            } else {

                Alert.alert('testset', JSON.stringify(data.message))
            }
        },
    });
}
