import { useAuthStore } from "~/stores/useAuthStore";

class AuthService {
  private get apiClient() {
    // Get the apiClient from the Nuxt app context
    const { $apiClient } = useNuxtApp();
    return $apiClient;
  }

  async loginAsync(payload: any, returnUrl: string = "/") {
    return this.apiClient
      .post("/api/Account/login", payload)
      .then((response) => {
        if (response.status === 200) {
          useAuthStore().update(response.data);
          useRouter().push(returnUrl);
        } else if (response.status === 400) {
          console.log(response.data);
          throw new Error(response.data);
        } else {
          throw new Error("Invalid username or password");
        }
      });
  }

  logout(returnUrl: string = "/"): void {
    useAuthStore().update();
    useRouter().push(returnUrl);
  }
}

export default new AuthService();
