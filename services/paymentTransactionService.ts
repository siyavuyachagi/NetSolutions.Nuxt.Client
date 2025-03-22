import apiClient from "~/api/apiClient";

class PaymentTransactionService {
  async getTransactionAsync(id: string): Promise<any> {
    return apiClient
      .get(`/api/PaymentTransactions/${id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          return response.data;
        } else {
          throw new Error("Invalid username or password");
        }
      });
  }
}

export default new PaymentTransactionService();
