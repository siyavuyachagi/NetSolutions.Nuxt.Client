import type { BillingCycle } from "../constants/BillingCycle";
import type { BusinessServicePackage } from "./BusinessServicePackage";

export interface BusinessServicePackageFeature {
  id: string;
  businessServicePackage: BusinessServicePackage;
  name: string;
  description: string;
  price: number;
  billingCycle: BillingCycle;
  createdAt: Date;
  updatedAt: Date;
}
