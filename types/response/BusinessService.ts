import type { BusinessServicePackage } from "./BusinessServicePackage";
import type { FileMetadata } from "./FileMetadata";
import type { Testimonial } from "./Testimonial";

export interface BusinessService {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  testimonials: Testimonial[];
  thumbnail: string;
  images: FileMetadata[];
  businessServicePackages: BusinessServicePackage[];
}
