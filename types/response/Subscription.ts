import type { BusinessServicePackage } from "./BusinessServicePackage";
import type { Client } from "./Client";

export interface Subscription {
  id: string;
  status: string;
  createdAt: Date; // or Date
  updatedAt: Date; // or Date
  recurringCycle: number;
  client: Client;
  businessServicePackage: BusinessServicePackage;
}
 