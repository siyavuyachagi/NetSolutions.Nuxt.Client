
import type { Client } from "~/interface/Client";

class ClientService {
  private get apiClient() {
    // Get the apiClient from the Nuxt app context
    const { $apiClient } = useNuxtApp();
    return $apiClient;
  }

  async getClientAsync(id: string): Promise<Client> {
    return this.apiClient.get(`/api/Clients/${id}`).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Error fetching User: ${id}`);
      }
    });
  }

  async getClientsAsync(): Promise<any[]> {
    return this.apiClient.get(`/api/Clients`).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Error fetching Users");
      }
    });
  }
}

export default new ClientService();
