import { useAuthStore } from "~/stores/useAuthStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.client) {
    const store = useAuthStore();
    const router = useRouter();

    const authorizeMeta = to.meta.authorize;

    // If no authorization required, exit
    if (authorizeMeta === undefined) return;

    // Not authenticated
    if (!store.isAuthenticated) {
      return router.push({
        path: "/auth/login",
        query: {
          message: "Not authenticated.",
          returnUrl: to.fullPath,
        },
      });
    }

    // If authorization is simply `true`, any authenticated user is allowed
    if (authorizeMeta === true) return;

    // If route specifies required roles
    if (Array.isArray(authorizeMeta)) {
      const userRoles: string[] = (store.user?.userRoles || []).map((r) =>
        r.toLowerCase()
      );
      const requiredRoles: string[] = authorizeMeta.map((r) => r.toLowerCase());

      const hasRole = requiredRoles.some((role) => userRoles.includes(role));
      if (!hasRole) {
        return router.push({
          path: "/auth/login",
          query: {
            message: "Not authorized.",
            returnUrl: to.fullPath,
          },
        });
      }
    }
  }
});
