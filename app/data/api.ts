
import axios from 'axios';
import { getAccessToken } from '../logic/token';

const api = axios.create({
  baseURL: `http://54.91.151.16/api`,
  timeout: 5000
});

api.interceptors.request.use(async (config) => {
  // console.log('intercepter', config)

  const token = await getAccessToken()
  
  console.log('token' ,token)
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
    if (error.response) {
      console.error("Response Error:", {
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error("No Response Error:", error.request);
    } else {
      console.error("Unexpected Error:", error.message);
    }

    return Promise.reject(error);
  }
);


export default api;
