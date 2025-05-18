import { useAuthStore } from "~/stores/useAuthStore";
import type { ApiResponse } from "~/types/ApiResponse";

class AccountService {
  private get _apiClient() {
    // Get the apiClient from the Nuxt app context
    const { $apiClient } = useNuxtApp();
    return $apiClient;
  }
  private get _authStore() {
    return useAuthStore();
  }
  public get _router() {
    return useRouter();
  }

  async registerAsync(
    payload: Record<string, any>,
    returnUrl = this._apiClient.getUri()
  ): Promise<ApiResponse<any>> {
    try {
      const response = await this._apiClient.post(
        `/api/Account/register?returnUrl=${returnUrl}`,
        payload
      );

      if (response.status === 200) {
        this._authStore.signIn(response.data);
        return {
          success: true,
          data: response.data,
          message: "Account created successfully.",
        };
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: error?.response?.data?.title || "Something went wrong",
      };
    } finally {
      return {
        success: false,
        message: "An unexpected error occurred.",
      };
    }
  }

  async loginAsync(payload: any, returnUrl: string = "/") {
    return this._apiClient
      .post("/api/Account/login", payload)
      .then((response) => {
        if (response.status === 200) {
          this._authStore.signIn(response.data);
          this._router.replace(returnUrl);
        }
      });
  }

  logout(returnUrl: string = "/"): void {
    this._authStore.signOut();
    this._router.replace(returnUrl);
  }

  async sendConfirmationEmailAsync(
    email: string,
    returnUrl: string
  ): Promise<ApiResponse<any>> {
    return this._apiClient
      .post(
        `/api/Account/send/confirmation/email/${email}?returnUrl=${returnUrl}`
      )
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data);
          return {
            success: true,
            data: response.data,
            message: "Email sent successfully",
          };
        } else {
          throw new Error(response.data);
        }
      });
  }

  async forgotPasswordAsync(
    email: string,
    returnUrl: string
  ): Promise<ApiResponse<any>> {
    return this._apiClient
      .post(`/api/Account/forgot-password/${email}?returnUrl=${returnUrl}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          return {
            success: true,
            data: response.data,
            message: "Email sent successfully",
          };
        } else {
          throw new Error(response.data);
        }
      });
  }

  async resetPasswordAsync(payload: any): Promise<ApiResponse<any>> {
    return this._apiClient
      .post(`/api/Account/reset-password`, payload)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          return {
            success: true,
            data: response.data,
            message: "Password updated successfully",
          };
        } else {
          throw new Error(response.data);
        }
      });
  }
}

export default new AccountService();
