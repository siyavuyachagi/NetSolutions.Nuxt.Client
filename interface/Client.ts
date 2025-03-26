import type { ApplicationUser } from "./ApplicationUser";
import type { Project } from "./Project";

export interface Client extends ApplicationUser {
  projects: Project[];
}
