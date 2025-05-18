import type { Project } from "./Project";
import type { Solution } from "./Solution";

export interface TechnologyStack {
  id: string;
  name: string;
  description?: string;
  nameAbbr?: string;
  iconUrl?: string;
  iconHTML?: string;
  type: string;
  createdAt: Date;
  modifiedAt: Date;
  projects: Project[];
  solutions: Solution[];
}
