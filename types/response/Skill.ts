import type { Staff } from "./Staff";

export interface Skill {
  id: string;
  name: string;
  description: string;
  staff: Staff[];
  discriminator: string;
  createdAt: Date;
  updatedAt: Date;
}
