import type { PaymentTransaction } from "~/interface/PaymentTransaction";

class PaymentTransactionService {
  private get apiClient() {
    // Get the apiClient from the Nuxt app context
    const { $apiClient } = useNuxtApp();
    return $apiClient;
  }

  async getTransactionAsync(id: string): Promise<PaymentTransaction> {
    return this.apiClient
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
