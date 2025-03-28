import axios from "axios";

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    console.log("IsDev:", process.env.NODE_ENV === "development");
    console.log("runtimeConfig: ", useRuntimeConfig());

    config.baseURL = useRuntimeConfig().public.apiUrl;
    const token = useAuthStore().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
