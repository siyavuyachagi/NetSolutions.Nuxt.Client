import type { Project } from "./Project";
import type { ProjectTeamMember } from "./ProjectTeamMember";
import type { Solution } from "./Solution";

export interface ProjectTeam {
  id: string;
  name?: string;
  projectTeamMembers: ProjectTeamMember[];
  project: Project;
  solutions: Solution[];
}
