import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from './auth';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_GRAPHQL_URL,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createAxiosInstance = async () => {
    const token = await getToken();
    return axios.create({
        baseURL: process.env.EXPO_PUBLIC_GRAPHQL_URL,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
};

// Add request interceptor to attach token to all requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
