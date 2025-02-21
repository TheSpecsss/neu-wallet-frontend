import api from "../api/axiosInstance"
export const createUser = async (userData: { 
    email: string; 
    name: string; 
    password: string; 
    confirmPassword: string; 
  }) => {
    try {
      const response = await api.post("", {  
        query: `
          mutation CreateUser($email: String!, $name: String!, $password: String!, $confirmPassword: String!) {
            createUser(email: $email, name: $name, password: $password, confirmPassword: $confirmPassword) {
              id
            }
          }`,
          variables: { 
            "email": userData.email, 
            "name": userData.name, 
            "password": userData.password, 
            "confirmPassword": userData.confirmPassword 
          }
      });
  
      return response.data.data.createUser;
    } catch (error: any) {
      console.error("Error registering user:", error.response?.data || error);
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  };
  