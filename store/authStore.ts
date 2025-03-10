import { defineStore } from "pinia";
import { ref, computed } from "vue";
import AccountService from "~/services/accountService";
import getTokenExpiration from "~/tokenExp";

interface User {
  id: string;
  userName: string;
  roles: string[];
}

interface ResponseData {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const useAuthStore = defineStore("auth", () => {
  // Constants
  const LOCAL_STORAGE_KEY = "NS_A_KEY";

  // Add a reference to track rememberMe preference
  const rememberMePreference = ref<boolean>(false);

  // State
  const getStoredData = (key: string) => {
    if (!import.meta.client) return null; // Return null if sessionStorage or localStorage is not available

    const sessionData = sessionStorage.getItem(key);
    const localData = localStorage.getItem(key);

    try {
      // Check localStorage first if data exists there, it means rememberMe was true
      if (localData) {
        rememberMePreference.value = true;
        return JSON.parse(localData);
      }

      // Otherwise check sessionStorage
      if (sessionData) {
        rememberMePreference.value = false;
        return JSON.parse(sessionData);
      }

      return null;
    } catch (error) {
      return null;
    }
  };

  const storedData = getStoredData(LOCAL_STORAGE_KEY);
  const user = ref<User | null>(storedData?.user || null);
  const accessToken = ref<string | null>(storedData?.accessToken || null);
  const refreshToken = ref<string | null>(storedData?.refreshToken || null);

  // Getters
  const isAuthenticated = computed(() => {
    return !!user.value && !!accessToken.value;
  });

  // Methods
  function login(
    responseData: ResponseData,
    rememberMe: boolean = rememberMePreference.value
  ) {
    try {
      user.value = responseData.user;
      accessToken.value = responseData.accessToken;
      refreshToken.value = responseData.refreshToken;
      rememberMePreference.value = rememberMe;
      console.log(responseData);

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(responseData));
    } catch (error) {
      throw new Error(`Error loging in`);
    }
  }

  const logout = () => {
    try {
      user.value = null;
      accessToken.value = null;
      refreshToken.value = null;
      rememberMePreference.value = false;

      localStorage.removeItem(LOCAL_STORAGE_KEY);
      sessionStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (error) {
      throw new Error(`Error loging out`);
    }
  };

  async function isSessionExpired() {
    try {
      // Get token expiration time
      const tokenExpTime = getTokenExpiration(accessToken.value as string) ?? 0;
      const currentTime = Date.now();
      console.log("Token Expiry: ", tokenExpTime);
      console.log("Current Time: ", currentTime);

      // Check if the token is still valid
      if (currentTime < tokenExpTime) {
        console.log("Token is still valid.");
        return false;
      } else {
        console.log("Token expired");
        const newResponseData = await new AccountService().refreshToken(
          refreshToken.value as string
        );

        if (!newResponseData) return true;
        //Token refreshed successfully
        login(newResponseData);
        return false;
      }
    } catch (error) {
      logout();
      console.error("Error refreshing token:", error);
      return true;
    }
  }

  return {
    user,
    accessToken,
    refreshToken,

    isAuthenticated,

    login,
    logout,
    isSessionExpired,
  };
});
