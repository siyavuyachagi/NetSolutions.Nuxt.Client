import type { Project } from "./Project";
import type { TeamMember } from "./TeamMember";

export interface ProjectTeam {
  id: string;
  projectId: string;
  project?: Project | null;
  name?: string | null;
  teamMembers: TeamMember[];
}
