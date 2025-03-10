import apiClient from "../../netsolutions.client/services/apiClient";
import { useAuthStore } from "~/store/authStore";

export default class AccountService {
  //✅Login method
  async loginAsync(
    payload: any,
    returnUrl: string | null = null
  ): Promise<any> {
    try {
      const response = await apiClient.post(`/account/login`, payload);

      if (response.status === 200) {
        useAuthStore().login(response.data, payload?.rememberMe);
        returnUrl = returnUrl
          ? returnUrl
          : useRoute().query?.returnUrl
          ? (useRoute().query?.returnUrl as string)
          : "/";
        useRouter().push(returnUrl);
      } else {
        throw new Error(response.data);
      }
    } catch (error: any) {
      // Handle other errors
      throw new Error(
        `${error.response ? error.response.data : error.message}`
      );
    }
  }

  public async refreshToken(refreshToken: string) {
    return apiClient
      .post("/Account/token/refresh", refreshToken)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Failed to refresh the token.");
        }
      });
  }

  public static logout(returnUrl: string | null = null) {
    useAuthStore().logout();
    if (returnUrl) useRouter().push(returnUrl);
  }

  public async usersAsync() {
    return apiClient.get("/Account/users").then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch services");
      }
    });
  }
}
