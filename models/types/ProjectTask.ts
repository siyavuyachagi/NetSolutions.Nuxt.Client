import type { Project } from "./Project";

export interface ProjectTask {
  id: string;
  projectId: string;
  project?: Project | null;
  title: string;
  description?: string | null;
  priority: string;
  modifiedAt: Date;
  createdAt: Date;
  dueDate?: Date | null;
  status: string;
}
