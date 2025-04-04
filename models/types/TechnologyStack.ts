export interface TechnologyStack {
  id: string;
  name: string;
  description?: string | null;
  nameAbbr?: string | null;
  icon16x16?: string | null;
  type: string;
  createdAt: Date;
  modifiedAt: Date;
}
