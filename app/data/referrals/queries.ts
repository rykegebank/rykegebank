import { useQuery } from "@tanstack/react-query";
import api from "../api";
import { URLS } from "../urls";

export interface Referrals {
    remark: string;
    status: string;
    message: any;
    data?: {
        referrals: Array<{
            id: number
            username: string
            level: number
        }>
    };
  }
  
  
export const useFetchReferralLink = () => {
    return useQuery({
      queryKey: ['referral_link'],
      queryFn: async () => {
  
          const { data: { data: { referral_link } } } = await api.get(URLS.referralLink)
  
          return referral_link
      },
    });
  };
  
  

export const useFetchReferees = () => {
    return useQuery({
      queryKey: ['referees'],
      queryFn: async () => {
  
        try {
            const { data: { data: { referrals } } } = await api.get(URLS.referees)

            return referrals;
        } catch(e){
            console.log(e)
        }
      },
    });
  };
  