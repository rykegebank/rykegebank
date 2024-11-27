import { useQuery } from '@tanstack/react-query';
import api from '../api';
import { URLS } from '../urls';


export const useFetchCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async () => {

        const { data: { data: { countries } } } = await api.get(URLS.allCountries)

        return countries
    //   const { data } = await api.get<SelectFood[]>(URLS.recent_foods(type), {
    //     params: {
    //       limit: 30,
    //     },
    //   });
    //   return data;
    },
  });
};
