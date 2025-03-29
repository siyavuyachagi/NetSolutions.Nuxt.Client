import type { BusinessService } from "./BusinessService";
import type { Client } from "./Client";
import type { FileMetadata } from "./FileMetadata";
import type { ProjectMilestone } from "./ProjectMilestone";
import type { ProjectTask } from "./ProjectTask";
import type { ProjectTeam } from "./ProjectTeam";
import type { Solution } from "./Solution";
import type { TechnologyStack } from "./TechnologyStack";
import type { Timeline } from "./Timeline";

export interface Project {
  id: string;
  clientId: string;
  client?: Client | null;
  businessServiceId: string;
  businessService?: BusinessService | null;
  name: string;
  description: string;
  budget: number;
  status: string;
  createdAt: Date;
  isDeleted: boolean;
  targetAudience?: string | null;
  team?: ProjectTeam | null;
  timeline?: Timeline | null;
  documents: FileMetadata[];
  solutions: Solution[];
  technologyStacks: TechnologyStack[];
  projectMilestones: ProjectMilestone[];
  projectTasks: ProjectTask[];
}
