import apiClient from "~/api/apiClient";
import type { Subscription } from "~/interface/Subscription";

class SubscriptionService {
  constructor() {}

  async getSubscription(id: string): Promise<Subscription> {
    return apiClient.get(`/api/Subscriptions/${id}`).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data);
      }
    });
  }
}

export default new SubscriptionService();
