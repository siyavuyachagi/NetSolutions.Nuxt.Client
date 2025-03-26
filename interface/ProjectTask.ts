import type { Project } from "./Project";

export enum EPriority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export enum EStatus {
  Pending = "Pending",
  Started = "Started",
  Complete = "Complete",
}

export interface ProjectTask {
  id: string;
  projectId: string;
  project?: Project | null;
  title: string;
  description?: string | null;
  priority: EPriority;
  modifiedAt: Date;
  createdAt: Date;
  dueDate?: Date | null;
  status: EStatus;
}
