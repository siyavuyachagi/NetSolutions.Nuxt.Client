

class NotificationService {
  private get apiClient() {
    // Get the apiClient from the Nuxt app context
    const { $apiClient } = useNuxtApp();
    return $apiClient;
  }

  async contactUsAsync(payload: string): Promise<any> {
    return this.apiClient
      .post(`/api/Notifications/contact/us/web`, payload)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error(response.data);
        }
      });
  }
}

export default new NotificationService();
