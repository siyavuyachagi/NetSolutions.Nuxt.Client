import apiClient from "~/api/apiClient";
import { useAuthStore } from "~/stores/useAuthStore";

class AuthService {
  constructor() {}

  async getUserRoles(userId: string): Promise<any> {
    return apiClient
      .post(`/api/Account/userRoles/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          return response.data;
        } else if (response.status === 400) {
          throw new Error(response.data);
        } else {
          throw new Error("Invalid username or password");
        }
      });
  }
}

export default new AuthService();
