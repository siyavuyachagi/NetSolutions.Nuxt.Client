import apiClient from "~/api/apiClient";
import type { Project } from "~/interface/Project";

class ProjectService {
  async getProjectAsync(id: string): Promise<Project> {
    return apiClient.get(`/api/Clients/${id}`).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        throw new Error(`Error fetching Project: ${id}`);
      }
    });
  }

  async getProjectsAsync(): Promise<Project[]> {
    return apiClient.get(`/api/Clients`).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        throw new Error("Error fetching projects");
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
