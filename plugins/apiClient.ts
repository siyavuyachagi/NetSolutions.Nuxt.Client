// plugins/apiClient.js
import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const apiUrl = import.meta.env.DEV
    ? config.public.apiUrlDev
    : config.public.apiUrlProd;

  console.log("Env: ", import.meta.env);
  console.log("Runtime config: ", config.public);
  console.log("URL: ", apiUrl);

  // Create axios instance with base URL from runtime config
  const apiClient = axios.create({
    baseURL: apiUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor
  apiClient.interceptors.request.use(
    (config) => {
      // Add your request interceptor logic here
      // For example, adding auth tokens:
      const token = useAuthStore().accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error("Request interceptor error");
      return Promise.reject(error);
    }
  );

  // Provide the configured axios instance to your Nuxt app
  return {
    provide: {
      apiClient,
    },
  };
});
