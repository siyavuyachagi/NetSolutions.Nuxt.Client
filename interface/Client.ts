import type { ApplicationUser } from "./ApplicationUser";
import type { Project } from "./Project";
import type { Subscription } from "./Subscription";

export interface Client extends ApplicationUser {
  subscription: Subscription;
  projects: Project[];
}
