import type { ApplicationUser } from "./ApplicationUser";

export interface Feedback {
  id: string;
  evaluator: ApplicationUser;
  comment: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}