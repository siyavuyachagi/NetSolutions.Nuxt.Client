import type { BillingCycle } from "~/constants/BillingCycle";
import type { BusinessServicePackage } from "./BusinessServicePackage";

export interface BusinessServicePackageFeature {
  id: string;
  businessServicePackageId: string;
  businessServicePackage?: BusinessServicePackage | null;
  title: string;
  description: string;
  price: number; // In decimal format
  billingCycle: BillingCycle;
  createdAt: Date;
  updatedAt: Date;
}
