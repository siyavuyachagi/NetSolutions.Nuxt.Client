import type { BusinessServicePackage } from "./BusinessServicePackage";
import type { Feedback } from "./Feedback";

export interface BusinessService {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  thumbnail?: string | null;
  packages: BusinessServicePackage[];
  testimonials: Feedback[];
}
