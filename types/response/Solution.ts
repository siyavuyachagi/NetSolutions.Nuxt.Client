import type { FileMetadata } from "./FileMetadata";
import type { Project } from "./Project";
import type { Review } from "./Review";
import type { SolutionFeature } from "./SolutionFeature";
import type { TechnologyStack } from "./TechnologyStack";

export interface Solution {
  id: string;
  name: string;
  project: Project;
  description: string;
  price: number;
  sourceUrl: string;
  previewUrl: string;
  version: string;
  createdAt: Date;
  updatedAt: Date;
  discriminator: string;
  features: SolutionFeature[];
  technologyStacks: TechnologyStack[];
  images: FileMetadata[];
  documents: FileMetadata[];
  reviews: Review[];
  likes: any[];
}
