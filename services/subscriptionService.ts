import type { Subscription } from "~/interface/Subscription";

class SubscriptionService {
  private get apiClient() {
    // Get the apiClient from the Nuxt app context
    const { $apiClient } = useNuxtApp();
    return $apiClient;
  }

  async getSubscription(id: string): Promise<Subscription> {
    return this.apiClient.get(`/api/Subscriptions/${id}`).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data);
      }
    });
  }
}

export default new SubscriptionService();
