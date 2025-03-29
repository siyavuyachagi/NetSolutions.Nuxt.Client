class MessagesService {
  private get apiClient() {
    // Get the apiClient from the Nuxt app context
    const { $apiClient } = useNuxtApp();
    return $apiClient;
  }

  async contactUs(request: any): Promise<any> {
    return this.apiClient
      .post(`/api/Messages/contact-us`, request)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error(response.data || "Error proccessing your request");
        }
      });
  }
}

export default new MessagesService();
