// auth.ts - Login and token handling
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './axiosInstance';

type User = {
  id: string;
  name: string;
  email: string;
  accountType: string;
  isVerified: boolean;
}

type LoginResponse = {
  token: string;
  user: User;
  expiresIn?: number;
};

export const login = async (email: string, password: string): Promise<User> => {
  try {
    const response = await api.post<LoginResponse>('/login', { email, password });
    const { token, user } = response.data;
    
    // Store token securely
    await AsyncStorage.setItem('authToken', token);
    
    // Optionally store expiration time if your API provides it
    if (response.data.expiresIn) {
      const expirationTime = new Date().getTime() + response.data.expiresIn * 1000;
      await AsyncStorage.setItem('tokenExpiration', expirationTime.toString());
    }
    
    return user;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  await AsyncStorage.removeItem('authToken');
  await AsyncStorage.removeItem('tokenExpiration');
};

export const isAuthenticated = async (): Promise<boolean> => {
  const token = await AsyncStorage.getItem('authToken');
  return !!token;
};