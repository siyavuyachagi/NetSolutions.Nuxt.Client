import apiClient from "~/api/apiClient";

class ProjectService {
  async getProjectAsync(id: string): Promise<any> {
    return apiClient.get(`/api/Clients/${id}`).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        throw new Error("Invalid username or password");
      }
    });
  }

  async getProjectsAsync(): Promise<any[]> {
    return apiClient.get(`/api/Clients`).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        throw new Error("Invalid username or password");
      }
    });
  }

  async getProjectByUserIdAsync(userId: string): Promise<any> {
    return apiClient.get(`/api/Projects/user/${userId}`).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        throw new Error("Invalid username or password");
      }
    });
  }

  async postProjectCreate(request: any): Promise<any> {
    return apiClient.post(`/api/Projects`, request).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        throw new Error("Invalid username or password");
      }
    });
  }
}

export default new ProjectService();
