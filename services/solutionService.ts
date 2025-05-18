import { useNuxtApp } from "#app";
import type { PaymentTransaction, Solution } from "~/types/response";

class SolutionService {
  private get apiClient() {
    // Get the apiClient from the Nuxt app context
    const { $apiClient } = useNuxtApp();
    return $apiClient;
  }
  constructor() {}

  async getSolutionAsync(id: string): Promise<Solution | null> {
    try {
      // Fetch the solution from the API
      const response = await this.apiClient.get(`/api/Solutions/${id}`);
      if (response.status === 200) {
        console.log(`Solution: `,response.data)
        return response.data;
      } else {
        throw new Error("Failed to fetch solution");
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async getSolutionsAsync(): Promise<Solution[]> {
    try {
      // Fetch solutions from API
      const response = await this.apiClient.get(`/api/Solutions`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch solutions");
      }
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async searchSolutionsAsync(
    title?: string,
    description?: string,
    createdAt?: Date
  ): Promise<any[]> {
    return this.apiClient.get(`/api/Solutions`).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch solutions");
      }
    });
  }

  async purchaseSolutionsAsync(id: string, payload: any) {
    try {
      const successRedirectUrl = `${location.origin}/solutions/purchase/${id}/success`;
      const cancelRedirectUrl = `${location.origin}/solutions/purchase/${id}/cancel`;
      const response = await this.apiClient.post(
        `/api/Solutions/${id}/purchase?successRedirectUrl=${successRedirectUrl}&cancelRedirectUrl=${cancelRedirectUrl}`,
        payload
      );

      if (response.status === 200) {
        console.log("Redirect URL received:", response.data.redirectUrl);

        if (response.data.redirectUrl) {
          window.location.href = response.data.redirectUrl; // Redirect user
          return { success: true };
        } else {
          throw new Error("Redirect URL is missing in the response");
        }
      } else {
        throw new Error("Error purchasing solution");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      throw error;
    }
  }

  async paymentTransaction(Id: string): Promise<PaymentTransaction> {
    return this.apiClient
      .get(`/api/Solutions/transaction/${Id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Failed to fetch solutions");
        }
      });
  }

  async likeAsync(id: string, payload: any): Promise<any[]> {
    return this.apiClient
      .post(`/api/Solutions/${id}/like`, payload)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Failed to fetch solutions");
        }
      });
  }

  async downloadSolutionsAsync(id: string) {
    try {
      const response = await this.apiClient.post(
        `/api/Solutions/${id}/download`
      );

      if (response.status === 200) {
        if (response.data) {
          return { success: true, data: response.data };
        } else {
          throw new Error("Redirect URL is missing in the response");
        }
      } else {
        throw new Error("Error purchasing solution");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      throw error;
    }
  }
}

export default new SolutionService();
