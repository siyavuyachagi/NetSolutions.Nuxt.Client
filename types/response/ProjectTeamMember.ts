import type { ProjectTeam } from "./ProjectTeam";
import type { Staff } from "./Staff";
import type { TeamMemberRole } from "./TeamMemberRole";

export interface ProjectTeamMember {
  id: string;
  projectTeam: ProjectTeam;
  member: Staff;
  teamMemberRoles: TeamMemberRole[];
  createdAt: Date;
  updatedAt: Date;
}
