import type { ApiResponse } from "~/types/ApiResponse";

class FeedbackService {
  private get apiClient() {
    // Get the apiClient from the Nuxt app context
    const { $apiClient } = useNuxtApp();
    return $apiClient;
  }

  async deleteFeedbackAsync(id: string): Promise<ApiResponse<string>> {
    try {
      const response = await this.apiClient.delete(`/api/Feedbacks/${id}`);

      if (response.status === 204) {
        return {
          success: true,
          data: response.data,
          message: "Request was successful",
        };
      } else {
        throw new Error(response.data || "Error processing your request");
      }
    } catch (error: any) {
      return {
        success: false,
        data: "",
        message: error.message || "An unexpected error occurred",
      };
    }
  }
}

export default new FeedbackService();
