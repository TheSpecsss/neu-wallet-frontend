import { useQuery } from "@tanstack/react-query";
import axios from "axios";


interface User {
  id: string;  
  name: string;
}


const API_BASE_URL = "http://127.0.0.1:8080";


const fetchUsers = async (): Promise<User[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/src/shared/infrastructure/http/graphql/types/user.ts`);
      console.log("Fetched Users:", response.data); 
      return response.data;
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
