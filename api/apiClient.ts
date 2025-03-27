import axios from "axios";

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use(
  (config) => {
    //BaseUrl
    config.baseURL = import.meta.env.DEV
      ? useRuntimeConfig().public.apiUrl
      : useRuntimeConfig().public.apiUrlLive;
      console.log(useRuntimeConfig())
    //Token
    const token = useAuthStore().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
