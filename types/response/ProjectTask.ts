export interface ProjectTask {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  priority: string;
  updatedAt: Date;
  createdAt: Date;
  dueAt?: Date;
  status: string;
}
