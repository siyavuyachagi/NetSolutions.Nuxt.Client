import type { ApplicationUser } from "./ApplicationUser";
import type { Project } from "./Project";

export interface ProjectMilestone {
  id: string;
  project: Project;
  user: ApplicationUser;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
