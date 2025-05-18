import type { BusinessServicePackage } from "~/types/response";

class BusinessServicePackageService {
  private get apiClient() {
    // Get the apiClient from the Nuxt app context
    const { $apiClient } = useNuxtApp();
    return $apiClient;
  }

  async getBusinessServicePackages(): Promise<BusinessServicePackage[]> {
    return this.apiClient
      .get(`/api/BusinessServicePackages`)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Invalid username or password");
        }
      });
  }

  async getBusinessServicePackage(id: string): Promise<BusinessServicePackage> {
    return this.apiClient
      .get(`/api/BusinessServicePackages/${id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Invalid username or password");
        }
      });
  }

  async postSubscribeAsync(id: string, payload: any): Promise<any> {
    return this.apiClient
      .post(`/api/BusinessServicePackages/subscribe/${id}`, payload)
      .then((response) => {
        if (response.status === 200) {
          console.log("Redirect URL received:", response.data);

          if (response.data.redirectUrl) {
            window.location.href = response.data.redirectUrl; // Redirect user
            return { success: true };
          } else {
            throw new Error("Redirect URL is missing in the response");
          }
        } else {
          throw new Error("Error processiong the request");
        }
      });
  }
}

export default new BusinessServicePackageService();
