import apiClient from "~/api/apiClient";

class NotificationService {
  constructor() {}

  async contactUsAsync(payload: string): Promise<any> {
    return apiClient
      .post(`/api/Notifications/contact/us/web`, payload)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error(response.data);
        }
      });
  }
}

export default new NotificationService();
