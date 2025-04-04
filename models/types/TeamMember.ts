import type { ProjectTeam } from "./ProjectTeam";
import type { Staff } from "./Staff";
import type { TeamMemberRole } from "./TeamMemberRole";

export interface TeamMember {
  id: string;
  projectTeamId: string;
  projectTeam?: ProjectTeam | null;
  memberId: string;
  member?: Staff | null;
  roles: TeamMemberRole[];
  createdAt: Date;
}
