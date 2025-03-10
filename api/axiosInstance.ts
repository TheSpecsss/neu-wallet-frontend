import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_GRAPHQL_URL,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
