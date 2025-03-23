// auth.ts - Login and token handling
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './axiosInstance';
import { jwtDecode } from "jwt-decode";
import * as SecureStore from 'expo-secure-store';


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


export const logout = async (): Promise<void> => {
  removeToken();
};

export const isAuthenticated = async (): Promise<boolean> => {
    try {
        const token = await getToken();
        return token !== null;
    } catch (error) {
        console.log('[e]:Error checking authentication status', error);
        return false;
    }
};


export const storeToken = async (token: string) => {
    try {
        await SecureStore.setItemAsync('userToken', token);
        console.log('Token stored');
    } catch (error) {
        console.log('[e]:Error storing token', error);
    }
};

export const getToken = async (): Promise<string | null> => {
    try {
        let token = await SecureStore.getItemAsync('userToken');
        return token;
    } catch (error) {
        console.log('[e]:Error retrieving token', error);
        return null;
    }
};

export const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync('userToken');
    } catch (error) {
        console.log('[e]:Error removing token', error);
    }
};


export const getUserRole = async (): Promise<string | null> => {
    try {
        const userInfo = await getUserInfo();
        const userRole : string | null = userInfo.data.accountType || null;

        return userRole ;

      } catch (error) {
        console.log("[e]:Failed to fetch user info:", error);
      }

      return null;
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
        return response.data.data.getUser ; 
    };
    try {
        const data = await fetchUserData();

        const name : string = data.name || "none";
        const email : string = data.email || "none";
        const accountID : string = data.id || "none";
        const dateCreated : string  = data.id || "none";

        return { data, name, email, accountID, dateCreated }; // Return the data in an object
    } catch (error) {
        console.log("[e]:Error fetching user data:", error);
        throw error; // Rethrow the error for the caller to handle
    }
}
        
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

        return response.data.data.getUserBalanceByUserId ; 
    };
    try {
        const data = await fetchUserData();
        return data.balance; // Return the data in an object
    } catch (error) {

        const user = await getUserRole();
        if(user === "USER") {
            console.log("[e]:Error fetching user wallet:", error);
        throw error; 
        }
        
    }
};