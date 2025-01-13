import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import api from "../api";
import { URLS } from "../urls";
import { Alert } from "react-native";
import { Routes } from "../../constants";
import { getAccessToken } from "../../logic/token";
import { useAppDispatch } from "../../store";
import { setEmail, setIsEmailVerified, setIsProfileCompleted, setIsSmsVerified, setMobile, setUser } from "../../store/slices/userSlice";
import toasts from "../../logic/toasts";


export interface SubmitUserParams {
    firstname: string;
    lastname: string;
    address: string;
    state: string;
    city: string;
    zip: string;
    image: string;
}

interface SubmitUserResponse {
    status: string
}

export const useSubmitUser = (shouldEdit?: boolean) => {
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    return useMutation({
        mutationFn: async (params: SubmitUserParams) => {
            const url = shouldEdit ? URLS.profileUpdate : URLS.submitUser
            console.log(params)
            const formData = new FormData();

            formData.append('firstname', params.firstname)
            formData.append('lastname', params.lastname)
            formData.append('address', params.address)
            formData.append('city', params.city)
            formData.append('state', params.state)
            formData.append('zip', params.zip)
            
            const uri = params.image

            if (uri) {
                const uriParts = uri.split('.');
                const fileType = uriParts[uriParts.length - 1];
    
                   
                formData.append('image', {
                    uri,
                    name: `profile.${fileType}`,
                    type: `image/${fileType}`,
                });
            }
  

            const {
                data
            } = await api.post<SubmitUserResponse>(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            
            return data

        },
        onSuccess: (data: SubmitUserResponse) => {
            console.log('testset', JSON.stringify(data))
            if (data.status === 'success') {
                dispatch(setIsProfileCompleted(1))
                if (shouldEdit) {
                    const { user } = data.data;
                    const { ev, sv, email, mobile, profile_complete } = user;
                    dispatch(setUser(user))
                    dispatch(setIsEmailVerified(ev));
                    dispatch(setIsSmsVerified(sv));
                    dispatch(setIsProfileCompleted(profile_complete));
                    dispatch(setEmail(email));
                    dispatch(setMobile(mobile));
                }
                toasts.genericSuccessToast(shouldEdit ? 'Profile completed successfully' : 'Profile update success!')
                navigation.reset({
                    index: 0,
                    routes: [{ name: Routes.main }],
                  });
            } else {
                Alert.alert('Unable to submit profile details', JSON.stringify(data.message))
            }
        },
      });
} 

