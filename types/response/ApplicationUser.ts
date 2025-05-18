import type { Organization } from "./Organization";
import type { PhysicalAddress } from "./PhysicalAddress";
import type { UserActivity } from "./UserActivity";

export interface ApplicationUser {
  id: string;
  userName: string;
  lastName: string;
  firstName: string;
  email: string;
  emailConfirmed: boolean;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  gender: string;
  bio: string;
  createdAt: string; // or Date if you parse it
  updatedAt: string;
  avatar: string;
  userRoles: string[];
  organization?: Organization;
  physicalAddress: PhysicalAddress;
  userActivities: UserActivity[];
}
