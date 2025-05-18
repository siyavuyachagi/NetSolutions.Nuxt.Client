import type { ApplicationUser } from "~/types/response";

class ApplicationUserService {
  private get apiClient() {
    // Get the apiClient from the Nuxt app context
    const { $apiClient } = useNuxtApp();
    return $apiClient;
  }

  async getApplicationUserAsync(id: string): Promise<ApplicationUser> {
    return this.apiClient.get(`/api/ApplicationUsers/${id}`).then((response) => {
      if (response.status === 200) {
        console.log(response.data)
        return response.data;
      } else {
        throw new Error(`Error fetching User: ${id}`);
      }
    });
  }

  async getApplicationUsersAsync(): Promise<ApplicationUser[]> {
    return this.apiClient.get(`/api/ApplicationUsers`).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Error fetching Users");
      }
    });
  }
}

export default new ApplicationUserService();