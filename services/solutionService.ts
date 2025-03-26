import { se } from "date-fns/locale";
import apiClient from "~/api/apiClient";
import { useSolutionsStore } from "~/stores/useSolutionsStore";
import usePayFast from "./usePayFast";
import type { Solution } from "~/interface/Solution";
import type { PaymentTransaction } from "~/interface/PaymentTransaction";
// import type { Client, Solution } from "~/api/interfaces";

class SolutionService {
  private STORAGE_KEY: string = "solutions-session-store";

  constructor() {}

  async getSolutionAsync(id: string): Promise<Solution | null> {
    try {
      // Fetch the solution from the API
      const response = await apiClient.get(`/api/Solutions/${id}`);
      if (response.status === 200) {
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
      const response = await apiClient.get(`/api/Solutions`);
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
    return apiClient.get(`/api/Solutions`).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch solutions");
      }
    });
  }

  async bookmarkAsync(payload: any): Promise<any[]> {
    return apiClient
      .post(`/api/Solutions/bookmark`, payload)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Failed to fetch solutions");
        }
      });
  }

  async bookmarkedUserSolutionsAsync(userId: string): Promise<any[]> {
    return apiClient
      .get(`/api/Solutions/bookmarked/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Failed to fetch solutions");
        }
      });
  }

  async purchaseSolutionsAsync(id: string, payload: any) {
    try {
      const response = await apiClient.post(
        `/api/Solutions/purchase/${id}`,
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
    return apiClient
      .get(`/api/Solutions/transaction/${Id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error("Failed to fetch solutions");
        }
      });
  }
}

export default new SolutionService();
