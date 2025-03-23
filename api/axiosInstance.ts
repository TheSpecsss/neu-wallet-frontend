import axios from "axios";
import { getToken } from './auth';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_GRAPHQL_URL,
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();
      //console.log('[api.interceptors] Token retrieved: ' + token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Failed to retrieve token:', error);
      // Optionally handle the error, e.g., redirect to login
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;