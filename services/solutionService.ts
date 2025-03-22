import { se } from "date-fns/locale";
import apiClient from "~/api/apiClient";
import { useSolutionsStore } from "~/stores/useSolutionsStore";
import usePayFast from "./usePayFast";
// import type { Client, Solution } from "~/api/interfaces";

class SolutionService {
  private STORAGE_KEY: string = "solutions-session-store";

  constructor() {}

  async getSolutionAsync(id: string): Promise<any> {
    try {
      if (import.meta.client) {
        // Check session storage for cached solutions
        const stored = sessionStorage.getItem(this.STORAGE_KEY);
        if (stored) {
          const solutions = JSON.parse(stored) || [];
          const solution = solutions.find((s: any) => s.id === id);
          if (solution) {
            return solution;
          }
        }
      }

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

  async getSolutionsAsync(): Promise<any[]> {
    try {
      // On client, attempt to retrieve from sessionStorage first
      if (import.meta.client) {
        const stored = sessionStorage.getItem(this.STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      }

      // Fetch solutions from API
      const response = await apiClient.get(`/api/Solutions`);
      if (response.status === 200) {
        // Save to sessionStorage on the client for subsequent requests
        if (import.meta.client) {
          sessionStorage.setItem(
            this.STORAGE_KEY,
            JSON.stringify(response.data)
          );
        }
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

  async purchaseSolutionsAsync(Id: string, payload: any): Promise<any> {
    try {
      // Send the solution ID and item details to your backend
      const response = await apiClient.post(
        `/api/Solutions/purchase/${Id}`,
        payload
      );

      if (response.status === 200) {
        // redirect the user to PayFast's payment page
        window.location.href = response.data.redirectUrl;
        return { success: true };
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
