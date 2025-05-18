import type { ApplicationUser } from "./ApplicationUser";
import type { Profession } from "./Profession";
import type { Staff_Skill } from "./Staff_Skill";

export interface Staff extends ApplicationUser {
  staffNumber: string;
  profession: Profession;
  staffSkills: Staff_Skill[];
}
