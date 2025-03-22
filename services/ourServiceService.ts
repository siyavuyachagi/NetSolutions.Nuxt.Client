import apiClient from "~/api/apiClient";

class OurServiceService {
  constructor() {}

  async getServicesAsync(): Promise<any[]> {
    return apiClient.get(`/api/OurServices`).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data);
      }
    });
  }

  async getServiceAsync(id: string): Promise<any> {
    return apiClient.get(`/api/OurServices/${id}`).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data);
      }
    });
  }
}

export default new OurServiceService();
