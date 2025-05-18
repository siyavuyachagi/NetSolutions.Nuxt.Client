import { defineStore } from "pinia";
import { ref, computed, watchEffect } from "vue";
import type { ApplicationUser } from "~/types/response";

export interface AuthStorage {
  applicationUser: ApplicationUser;
  accessToken: string;
  refreshToken: string;
}

export const useAuthStore = defineStore("auth", () => {
  const STORAGE_KEY = "ns-client-auth-store"; // Single key for storing auth data
  const user = ref<ApplicationUser | null>(null);
  const accessToken = ref<string | null>(null);
  const refreshToken = ref<string | null>(null);

  const isAuthenticated = computed(() => !!user.value && !!accessToken.value);

  function initializeAuth() {
    // Retrieving data from the cookie
    const userCookie = useCookie(STORAGE_KEY);

    // Check if the cookie is not empty
    if (userCookie.value) {
      // Assert that userCookie.value is of type AuthStorage
      const storedData = userCookie.value as unknown as AuthStorage;
      // Destructure the values into the required variables
      const {
        applicationUser: storedUser,
        accessToken: storedAccessToken,
        refreshToken: storedRefreshToken,
      } = storedData;

      // Assign the values to the store
      user.value = storedUser;
      accessToken.value = storedAccessToken;
      refreshToken.value = storedRefreshToken;
    }
  }

  const signIn = (authStorage: AuthStorage, rememberMe: boolean = false) => {
    try {
      if (import.meta.client) {
        // Retrieve the cookie object
        const userCookie = useCookie(STORAGE_KEY, {
          // `httpOnly: true` should only be used for server-side handling, not on the client-side
          httpOnly: false, // You can choose to omit this if the cookie needs to be accessible by JavaScript
          expires: rememberMe
            ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            : undefined, // Cookie expires in 30 days if 'rememberMe' is true
        });

        // Set the cookie value with the authentication data
        userCookie.value = JSON.stringify(authStorage);

        // Set individual state variables in Pinia store
        user.value = authStorage.applicationUser;
        accessToken.value = authStorage.accessToken;
        refreshToken.value = authStorage.refreshToken;
      }
    } catch (error) {
      console.error(`Error signing in: `, error);
    }
  };

  const signOut = () => {
    try {
      if (import.meta.client) {
        // Clear the user data in the store
        user.value = null;
        accessToken.value = null;
        refreshToken.value = null;

        if (import.meta.client) {
          // Remove data from cookies (if you're using cookies to store auth data)
          const userCookie = useCookie(STORAGE_KEY); // Access the cookie
          userCookie.value = ""; // Remove the cookie value by setting it to an empty string

          // Optionally, set the cookie expiry date to the past to ensure it gets deleted
          // userCookie.value = new Date(0);
        }
      }
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const updateUser = (applicationUser: ApplicationUser) => {};

  initializeAuth(); // Call the initializeAuth function when the store is created

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    signIn,
    signOut,
    updateUser,
  };
});
