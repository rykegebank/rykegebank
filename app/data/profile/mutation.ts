import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import api from "../api";
import { URLS } from "../urls";
import { Alert } from "react-native";
import { Routes } from "../../constants";
import { getAccessToken } from "../../logic/token";


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
