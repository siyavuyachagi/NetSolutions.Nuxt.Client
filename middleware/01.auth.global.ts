import { useAuthStore } from "~/stores/useAuthStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) {
    const store = useAuthStore();
    const router = useRouter();

    // User does not require Auth
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // console.log("User requires Auth");
      if (!store.isAuthenticated) {
        // console.log("User not Authenticated");
        router.push({
          path: "/auth/login",
          query: {
            message: "Not authenticated.",
            returnUrl: to.fullPath,
          },
        });
      } else {
        // console.log("User Authenticated", store.user);

        // If authenticated, check if the route requires specific roles
        const userRoles: string[] = (store.user?.roles || []).map((role) =>
          role.toLowerCase()
        ); // Normalize user roles
        const requiredRoles: string[] = ((to.meta.roles as string[]) || []).map(
          (role) => role.toLowerCase()
        ); // Normalize required roles

        // If route requires roles and the user doesn't have any of them, redirect
        if (
          requiredRoles.length > 0 && // Check if there are required roles
          !requiredRoles.some((role: string) => userRoles.includes(role))
        ) {
          // console.log("User not Authorized");
          router.push({
            path: "/auth/login",
            query: {
              message: "Not Authorized.",
              returnUrl: to.fullPath,
            },
          });
        }
      }
    }
  }
});
