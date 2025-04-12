import type { Organization } from "./Organization";
import type { Solution } from "./Solution";
import type { UserActivity } from "./UserActivity";

export interface ApplicationUser {
  id: string;
  userName: string;
  email: string;
  normalizedUserName?: string | null;
  lastName: string;
  firstName: string;
  bio: string;
  normalizedEmail?: string | null;
  emailConfirmed: boolean;
  phoneNumber?: string | null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd?: Date | null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  roles?: string[];
  avatar?: any | null;
  organizationId: string;
  organization: Organization;
  userActivities: UserActivity[];
  solutions: Solution[];
  createdAt: Date;
}
