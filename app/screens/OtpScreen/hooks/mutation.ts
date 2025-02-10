import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { URLS } from "../../../data/urls";
import api from "../../../data/api";
import { manageApiException } from '../../../utils/errorHandler';
import Toast from "../../../logic/toasts";
import { setOtpId, setOtpType, setNextPageUrl, setSubmitLoading, setResendLoading, setOtpStatus } from '../../../store/slices/otpSlice';
import { Routes } from '../../../constants'
import { RootState } from '../../../store';
import { AuthorizationResponseModel } from '../../../types/authorization';

interface VerifyCodeParams {
    otp: string;
}

export const useOtpActions = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.otp);
    const navigation = useNavigation();

    const setOtpDetails = (nextPageRoute: string, otpId: string, otpType: string) => {
        dispatch(setNextPageUrl(nextPageRoute));
        dispatch(setOtpId(otpId));
        dispatch(setOtpType(otpType));
    };

    const submitOtpMutation = useMutation({
        mutationFn: async ({ otp, otpID }: VerifyCodeParams & { otpID: string }) => {
            const url = URLS.submitOtpUrl + otpID;
            const { data } = await api.post<AuthorizationResponseModel>(url, { otp });
            return { ...data, otp };
        },

        onMutate: () => {
            dispatch(setSubmitLoading(true));
        },

        onSuccess: (data) => {
            console.log('data',data)
            dispatch(setSubmitLoading(false));

            if (data.status == 'success') {
                const trx = data.data?.trx ?? '';
                dispatch(setOtpId(data.data?.otpId ?? ''));
                dispatch(setOtpType('sms'));
                dispatch(setNextPageUrl(data.data?.verificationId ?? ''));

                if (!state.nextPageUrl) {
                    navigation.goBack();
                } else {
                    if (state.nextPageUrl === Routes.withdraw) {
                        navigation.navigate(state.nextPageUrl, { trx });
                    } else {
                        navigation.navigate(state.nextPageUrl, { otpId: data.data?.otpId ?? '' });
                    }
                }
            } else {
                manageApiException('Request failed');
                dispatch(setOtpStatus('failure'));
            }
        },

        onError: () => {
            dispatch(setSubmitLoading(false));
            dispatch(setOtpStatus('failure'));
        },
    });

    const resendOtpMutation = useMutation({
        mutationFn: async () => {
            const url = URLS.resendOtpUrl + state.otpId;
            const { data } = await api.post<AuthorizationResponseModel>(url);
            return data;
        },

        onMutate: () => {
            dispatch(setResendLoading(true));
        },

        onSuccess: (data) => {
            dispatch(setResendLoading(false));

            if (data.status === 'success') {
                Toast.genericSuccessToast(data.message?.success?.[0] ?? 'Request success');
                dispatch(setOtpStatus('success'));
            } else {
                manageApiException(data.message);
                dispatch(setOtpStatus('failure'));
            }
        },

        onError: () => {
            dispatch(setResendLoading(false));
            dispatch(setOtpStatus('failure'));
        },
    });

    return { submitOtpMutation, resendOtpMutation, setOtpDetails };
};

