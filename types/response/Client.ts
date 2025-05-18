import type { ApplicationUser } from "./ApplicationUser";
import type { Project } from "./Project";
import type { Solution } from "./Solution";
import type { Subscription } from "./Subscription";
import type { UserActivity } from "./UserActivity";

export interface Client extends ApplicationUser {
  subscription: Subscription;
  projects: Project[];
  userActivities: UserActivity[]; // adjust based on your actual TS definition
  solutions: Solution[];
}
