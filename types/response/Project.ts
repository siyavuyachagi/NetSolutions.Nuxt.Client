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
  name: string;
  description: string;
  budget: number;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  businessServiceId: string;
  businessService: BusinessService;
  client: Client;
  timeline: Timeline;
  projectTasks: ProjectTask[];
  projectMilestones: ProjectMilestone[];
  solutions: Solution[];
  documents: FileMetadata[];
  technologyStacks: TechnologyStack[];
  projectTeam: ProjectTeam;
  discriminator: string;
}
