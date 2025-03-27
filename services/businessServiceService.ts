import apiClient from "~/api/apiClient";
import type { BusinessService } from "~/interface/BusinessService";


class BusinessServiceService {
  constructor() {}

  async getServicesAsync(): Promise<BusinessService[]> {
    return apiClient.get(`/api/BusinessServices`).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data);
      }
    });
  }

  async getServiceAsync(id: string): Promise<BusinessService> {
    return apiClient.get(`/api/BusinessServices/${id}`).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(response.data);
      }
    });
  }
}

export default new BusinessServiceService();
