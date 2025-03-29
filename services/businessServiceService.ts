import type { BusinessService } from "~/interface/BusinessService";

class BusinessServiceService {
  private get apiClient() {
    // Get the apiClient from the Nuxt app context
    const { $apiClient } = useNuxtApp();
    return $apiClient;
  }
  constructor() {}

  async getServicesAsync(): Promise<BusinessService[]> {
    return this.apiClient.get(`/api/BusinessServices`).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data);
      }
    });
  }

  async getServiceAsync(id: string): Promise<BusinessService> {
    return this.apiClient
      .get(`/api/BusinessServices/${id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error(response.data);
        }
      });
  }
}

export default new BusinessServiceService();
