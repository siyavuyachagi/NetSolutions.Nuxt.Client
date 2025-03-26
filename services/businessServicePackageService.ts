import apiClient from "~/api/apiClient";
import type { BusinessServicePackage } from "~/interface/BusinessServicePackage";

class BusinessServicePackageService {
  async getBusinessServicePackages(): Promise<BusinessServicePackage[]> {
    return apiClient.get(`/api/BusinessServicePackages`).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Invalid username or password");
      }
    });
  }

  async getBusinessServicePackage(id: string): Promise<BusinessServicePackage> {
    return apiClient.get(`/api/BusinessServicePackages/${id}`).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Invalid username or password");
      }
    });
  }
}

export default new BusinessServicePackageService();
