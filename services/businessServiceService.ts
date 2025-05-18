import type { ApiResponse } from "~/types/ApiResponse";
import type { BusinessService } from "~/types/response";

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

  async createServiceTestimonialAsync(
    id: string,
    payload: any
  ): Promise<ApiResponse<string>> {
    try {
      const response = await this.apiClient.post(
        `/api/BusinessServices/${id}/testimonials`,
        payload
      );

      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
          message: "Request was successful.",
        };
      } else {
        throw new Error(response.data);
      }
    } catch (error: any) {
      return {
        success: false,
        data: "",
        message: error.message || "An error occurred",
      };
    }
  }
}

export default new BusinessServiceService();
