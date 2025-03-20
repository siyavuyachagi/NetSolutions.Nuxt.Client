import apiClient from "~/api/apiClient";

class ClientService {
  async getClientAsync(id: string): Promise<any> {
    return apiClient.get(`/api/Clients/${id}`).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        throw new Error("Invalid username or password");
      }
    });
  }

  async getClientsAsync(): Promise<any[]> {
    return apiClient.get(`/api/Clients`).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        throw new Error("Invalid username or password");
      }
    });
  }
}

export default new ClientService();
