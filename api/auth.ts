// auth.ts - Login and token handling
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './axiosInstance';
import { createAxiosInstance } from './axiosInstance';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

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

// const login

export const logout = async (): Promise<void> => {
  await AsyncStorage.removeItem('authToken');
  await AsyncStorage.removeItem('tokenExpiration');
};

export const isAuthenticated = async (): Promise<boolean> => {
  const token = await AsyncStorage.getItem('authToken');
  return !!token;
};


export const storeToken = async (token: string) => {
    try {
        await AsyncStorage.setItem('userToken', token);
    } catch (error) {
        console.error('Error storing token', error);
    }
};

export const getToken = async (): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem('userToken');
    } catch (error) {
        console.error('Error retrieving token', error);
        return null;
    }
};

export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('userToken');
    } catch (error) {
        console.error('Error removing token', error);
    }
};




// unused / unfinished 
export const fetchUserInfo = async () => {
  const axiosInstance = await createAxiosInstance();
  const query = `
      query {
          user {
              id
              name
              email
          }
      }
  `;

  try {
      const response = await axiosInstance.post('', { query });
      return response.data.data.user;
  } catch (error) {
      if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
              console.error('Token expired or unauthorized. Please log in again.');
              // Optionally, you can call removeToken() here to clear the expired token
              await removeToken();
          } else {
              console.error('Network error or other issue:', error.message);
          }
      } else {
          console.error('Unexpected error:', error);
      }
      throw error; // Rethrow the error for further handling if needed
  }
};