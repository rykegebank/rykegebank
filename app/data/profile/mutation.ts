import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import api from "../api";
import { URLS } from "../urls";
import { Alert } from "react-native";
import { Routes } from "../../constants";
import { getAccessToken } from "../../logic/token";
import { useAppDispatch } from "../../store";
import { setIsProfileCompleted } from "../../store/slices/userSlice";


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

export const useSubmitUser = () => {
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    return useMutation({
        mutationFn: async (params: SubmitUserParams) => {
            console.log(params)
            const {
                data
            } = await api.post<SubmitUserResponse>(URLS.submitUser, params)
            
            return data

        },
        onSuccess: (data: SubmitUserResponse) => {
            console.log('testset', data)
            if (data.status === 'success') {
                dispatch(setIsProfileCompleted(1))
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
