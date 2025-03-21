// auth.ts - Login and token handling

import * as SecureStore from 'expo-secure-store';
import api from './axiosInstance';
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
  removeToken();
};

export const isAuthenticated = async (): Promise<boolean> => {
    try {
        const token = await getToken();
        console.log('11 Token received:', token);
        return token !== null;
    } catch (error) {
        console.error('Error checking authentication status', error);
        return false;
    }
};


export const storeToken = async (token: string) => {
    try {
        await SecureStore.setItemAsync('userToken', token);
        console.log('Token stored');
    } catch (error) {
        console.error('Error storing token', error);
    }
};

export const getToken = async (): Promise<string | null> => {
    try {
        let token = await SecureStore.getItemAsync('userToken');
        return token;
    } catch (error) {
        console.error('Error retrieving token', error);
        return null;
    }
};

export const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync('userToken');
    } catch (error) {
        console.error('Error removing token', error);
    }
};

export const getUserInfo = async () => {
    const fetchUserData = async () => {
        const response = await api({
            data: {
                operationName: "GetUser",
                query: `query GetUser  {
                    getUser  {
                        id
                        name
                        email
                        accountType
                        createdAt
                    }
                }`,
            },
        });


export const getUserRole = async (): Promise<string | null> => {
    try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) return null;

        const decodedToken = jwtDecode<{ accountType: string }>(token);
        return decodedToken.accountType || null;
    } catch (error) {
        console.error("Error retrieving user role:", error);
        return null;
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
        // Assuming the API response structure is { data: { get:User  ... } }
        return response.data.data.getUser ; // Return the user data directly
    };
    try {
        const data = await fetchUserData();
        return { data }; // Return the data in an object
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error; // Rethrow the error for the caller to handle
    }
};

export const getUserBalance = async () => {
    const fetchUserData = async () => {
        const response = await api({
            data: {
                operationName: "GetUserBalanceByUserId",
                query: `query GetUserBalanceByUserId {
                            getUserBalanceByUserId {
                                balance
                            }
                        }`,
            },
        });

        // Assuming the API response structure is { data: { get:User  ... } }
        return response.data.data.getUserBalanceByUserId ; // Return the user data directly
    };
    try {
        const data = await fetchUserData();
        return { data }; // Return the data in an object
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error; // Rethrow the error for the caller to handle
    }
};