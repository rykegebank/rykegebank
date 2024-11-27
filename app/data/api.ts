
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}`,
  timeout: 5000
});

api.interceptors.request.use((config) => {
   console.log(config)
    const token = "20|sR0sWvxatUUJSTdCmGDbrnFpZ59ubIyMJNP0EpNl";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('error', JSON.stringify(error, null, 2));
  },
);

export default api;
