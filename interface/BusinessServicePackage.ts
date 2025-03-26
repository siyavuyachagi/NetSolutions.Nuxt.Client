import type { BillingCycle } from "~/constants/BillingCycle";
import type { BusinessService } from "./BusinessService";
import type { BusinessServicePackageFeature } from "./BusinessServicePackageFeature";

export interface BusinessServicePackage {
  id: string;
  businessServiceId: string;
  businessService: BusinessService;
  name: string;
  description: string;
  billingCycle: BillingCycle;
  price: number;
  createdAt: Date;
  packageFeatures: BusinessServicePackageFeature[];
}
