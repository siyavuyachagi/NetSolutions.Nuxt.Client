import type { ApplicationUser } from "./ApplicationUser";
import type { Project } from "./Project";

export interface ProjectMilestone {
  id: string;
  projectId: string;
  project?: Project | null;
  userId: string;
  user?: ApplicationUser | null;
  title: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}