import type { ApplicationUser } from "./ApplicationUser";
import type { PhysicalAddress } from "./PhysicalAddress";
import type { SocialLink } from "./SocialLink";

export interface Organization {
  id: string;
  physicalAddress: PhysicalAddress;
  name: string;
  description?: string;
  createdAt: string; // or Date
  updatedAt: string; // or Date
  users: ApplicationUser[];
  socialLinks: SocialLink[];
}
