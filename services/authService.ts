import apiClient from "~/api/apiClient";
import { useAuthStore } from "~/stores/useAuthStore";

class AuthService {
  constructor() {}

  async loginAsync(payload: any, returnUrl: string = "/"): Promise<any> {
    return apiClient.post("/api/Account/login", payload).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
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
