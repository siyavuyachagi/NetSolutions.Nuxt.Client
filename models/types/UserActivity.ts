import type { ApplicationUser } from "./ApplicationUser";

export interface UserActivity {
  id: string; // Guid represented as a string
  userId: string;
  user: ApplicationUser; // Optional because it’s a navigation property
  title: string;
  description: string;
  createdAt: Date;
}
