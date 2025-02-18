import { useQuery } from "@tanstack/react-query";
import axios from "axios";


interface User {
  id: string;
  name: string;
}
const GET_USERS = `
  query GetUsers {
    users {
      id
      name
    }
  }
`;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.post(API_BASE_URL, {
      query: GET_USERS, 
    });
    console.log("Fetched Users:", response.data); 
    return response.data.data.users; 
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};
