import axios from "axios";

const apiClient = axios.create({
  // baseURL:
  //   process.env.NODE_ENV === "development"
  //     ? "https://localhost:7047"
  //     : "https://netsolutions-hneebegvezgga3h2.canadacentral-01.azurewebsites.net",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    console.log("RuntimeConfig: ", useRuntimeConfig());

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
