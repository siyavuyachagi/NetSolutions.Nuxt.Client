import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "~/stores/useAuthStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) {
    const store = useAuthStore();

    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // Check for token expiry
      const accessToken = store.accessToken;
      if (accessToken) {
        try {
          const decoded: any = jwtDecode(accessToken); // Decoding the JWT token

          // Check if the token is expired by comparing expiration time with current time
          const currentTime = Date.now() / 1000; // Current time in seconds
          if (decoded.exp < currentTime) {
            console.log("Token expired");
            store.update(); // Log out the user
            useRouter().push({
              path: "/auth/login",
              query: {
                message: "Session expired. Please log in again",
                returnUrl: to.fullPath,
              },
            });
            return; // Prevent further processing if token is expired
          }
        } catch (error) {
          console.log("Error decoding token:", error);
          store.update(); // Log out the user in case of an invalid token
          useRouter().push({
            path: "/auth/login",
            query: {
              message: "Invalid token. Please log in again",
              returnUrl: to.fullPath,
            },
          });
          return; // Prevent further processing in case of an error
        }
      }

      // If authenticated, check if the route requires specific roles
      const userRoles: string[] = store.user?.roles || []; // ['admin', 'editor']
      const requiredRoles: string[] = (to.meta.roles as string[]) || []; // ['admin', 'superadmin']

      // If route requires roles and the user doesn't have any of them, redirect
      if (
        requiredRoles &&
        !requiredRoles.some((role) => userRoles.includes(role))
      ) {
        console.log("User does not have the required role");
      }
    }
  }
});
