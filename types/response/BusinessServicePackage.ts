import type { BusinessService } from "./BusinessService";
import type { BusinessServicePackageFeature } from "./BusinessServicePackageFeature";
import type { Subscription } from "./Subscription";

export interface BusinessServicePackage {
  id: string;
  businessServiceId: string;
  businessService: BusinessService;
  name: string;
  description: string;
  price: number;
  billingCycle: string;
  createdAt: Date;
  updatedAt: Date;
  businessServicePackageFeatures: BusinessServicePackageFeature[];
  subscriptions: Subscription[];
}
