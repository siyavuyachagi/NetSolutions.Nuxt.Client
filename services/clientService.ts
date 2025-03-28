import apiClient from "~/api/apiClient";

class ClientService {
  async getClientAsync(id: string): Promise<any> {
    return apiClient.get(`/api/Clients/${id}`).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Error fetching User: ${id}`);
      }
    });
  }

  async getClientsAsync(): Promise<any[]> {
    return apiClient.get(`/api/Clients`).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Error fetching Users");
      }
    });
  }
}

export default new ClientService();
