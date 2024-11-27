import axios, { AxiosRequestConfig } from "axios";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const apiClient = axios.create({
  timeout: 5000,
});

apiClient.interceptors.request.use((config) => {
  const token = "20|sR0sWvxatUUJSTdCmGDbrnFpZ59ubIyMJNP0EpNl";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const request = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: any,
  passHeader = true
) => {
  const config: AxiosRequestConfig = {
    url,
    method,
    data,
  };
  if (!passHeader) {
    delete config.headers;
  }
  const response = await apiClient(config);
  return response.data;
};
