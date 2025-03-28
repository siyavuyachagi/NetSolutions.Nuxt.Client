import type { BusinessServicePackage } from "./BusinessServicePackage";
import type { Client } from "./Client";

export interface Subscription {
  id: string;
  clientId: string;
  client: Client;
  businessServicePackageId: string;
  businessServicePackage: BusinessServicePackage;
  recurringCycle: number; // Number of months subscription should run, 0 = Infinite
  status: string;
  createdAt: string;
  updatedAt: string;
}
