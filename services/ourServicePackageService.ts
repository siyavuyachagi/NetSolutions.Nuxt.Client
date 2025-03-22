import apiClient from "~/api/apiClient";

class OurServicePackageService {
  async getOurServicePackages(): Promise<any[]> {
    return apiClient.get(`/api/OurServicePackages`).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Invalid username or password");
      }
    });
  }

  async getOurServicePackage(id: string): Promise<any> {
    return apiClient.get(`/api/OurServicePackages/${id}`).then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Invalid username or password");
      }
    });
  }
}

export default new OurServicePackageService();
