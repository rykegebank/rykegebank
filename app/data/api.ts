
import axios from 'axios';
import { getAccessToken } from '../logic/token';

const api = axios.create({
  baseURL: `http://54.91.151.16/api`,
  timeout: 5000
});

api.interceptors.request.use(async (config) => {
  console.log('intercepter', config)


  const token = await getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    // console.log("Response:", response);
    return response;
  },
  (error) => {
    console.log('error', JSON.stringify(error, null, 2));
  },
);

export default api;
