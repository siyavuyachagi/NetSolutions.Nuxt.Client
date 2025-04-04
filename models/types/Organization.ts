import type { ApplicationUser } from "./ApplicationUser";

export interface Organization {
  id: string; // Guid represented as a string
  name: string;
  createdAt: Date;
  users: ApplicationUser[]; // List of ApplicationUser objects
}
