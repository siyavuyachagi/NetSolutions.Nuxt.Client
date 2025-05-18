import type { Skill } from "./Skill";
import type { Staff } from "./Staff";

export interface Staff_Skill {
  id: string;
  staff: Staff;
  skill: Skill;
  yearsOfExperience: number;
  createdAt: Date;
  updatedAt: Date;
}
