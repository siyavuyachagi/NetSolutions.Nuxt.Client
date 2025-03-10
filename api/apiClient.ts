import axios from "axios";
import { useAuthStore } from "~/store/authStore";

// Create an instance of Axios with base configuration
const apiClient = axios.create({
  baseURL: "https://localhost:7073/api", // Your Web API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the JWT token in every request
apiClient.interceptors.request.use(async (config) => {
  if (useAuthStore().accessToken) {
    // Attach the (possibly refreshed) token to the request headers
    config.headers.Authorization = `Bearer ${useAuthStore().accessToken}`;
  }
  return config;
});

export default apiClient;
