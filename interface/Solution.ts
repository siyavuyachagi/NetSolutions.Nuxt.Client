import type { Feedback } from "./Feedback";
import type { FileMetadata } from "./FileMetadata";
import type { Project } from "./Project";
import type { SolutionFeature } from "./SolutionFeatures";
import type { TechnologyStack } from "./TechnologyStack";

export interface Solution {
  id: string;
  projectId?: string | null;
  project?: Project | null;
  name: string;
  description: string;
  SourceUrl?: string | null;
  previewUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  saurceUrl?: string | null;
  price: number;
  version: number;
  technologyStacks: TechnologyStack[];
  images: FileMetadata[];
  documents: FileMetadata[];
  discriminator: string;
  reviews: Feedback[];
  features: SolutionFeature[];
}
