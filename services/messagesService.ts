import apiClient from "~/api/apiClient";

class MessagesService {
  constructor() {}

  async contactUs(request: any): Promise<any> {
    return apiClient
      .post(`/api/Messages/contact-us`, request)
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error(response.data || "Error proccessing your request");
        }
      });
  }
}

export default new MessagesService();
