import type { ApplicationUser } from "./ApplicationUser";

export interface UserActivity {
  id: string;
  user: ApplicationUser; // You may want to use a partial or simplified version
  title: string;
  description: string;
  createdAt: string; // or Date
}
