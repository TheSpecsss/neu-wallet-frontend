import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance"; 

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

const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.post("", { 
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
