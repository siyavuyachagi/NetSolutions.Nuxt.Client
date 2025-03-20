import axios from "axios";
import { useAuthStore } from "~/stores/useAuthStore";

// Create an instance of Axios with base configuration
const apiClient = axios.create({
  // baseURL: "http://localhost:7204", // Uses the Nuxt proxy
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the JWT token in every request
apiClient.interceptors.request.use(async (config) => {
  const authStore = useAuthStore();
  if (authStore.accessToken) {
    config.headers.Authorization = `Bearer ${authStore.accessToken}`;
  }
  return config;
});

export default apiClient;
