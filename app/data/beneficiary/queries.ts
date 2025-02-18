import { useQuery } from "@tanstack/react-query";
import { URLS } from "../urls";
import api from "../api";

export const useFetchOtherBeneficiaries = () => {
    

    return useQuery({
        queryKey: ['other_beneficiaries'],
        queryFn: async () => {
    
            const { data: { data: { beneficiaries } } } = await api.get(URLS.otherBeneficiaryUrl)
    
            return beneficiaries
        },
      });
}