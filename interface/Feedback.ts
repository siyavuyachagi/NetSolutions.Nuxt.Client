import type { ApplicationUser } from "./ApplicationUser";

export interface Feedback {
  id: string; // Guid
  evaluatorId: string;
  evaluator: ApplicationUser;
  comment: string;
  rating: number; // 1 to 5
  createdAt: string; // ISO date string
}