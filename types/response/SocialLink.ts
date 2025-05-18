import type { ApplicationUser } from "./ApplicationUser";
import type { Organization } from "./Organization";

export interface SocialLink {
  id: string;
  user?: ApplicationUser;
  organization?: Organization;
  name: string;
  url?: string;
  handler?: string;
  createdAt: string; // or Date
  updatedAt: string; // or Date
  iconHTML?: string;
  iconUrl?: string;
}
