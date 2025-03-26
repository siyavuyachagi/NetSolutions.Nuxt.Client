export interface ApplicationUser {
  id: string;
  userName: string;
  email?: string | null;
  normalizedUserName?: string | null;
  lastName: string;
  firstName: string;
  normalizedEmail?: string | null;
  emailConfirmed: boolean;
  passwordHash?: string | null;
  securityStamp?: string | null;
  concurrencyStamp?: string | null;
  phoneNumber?: string | null;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd?: Date | null;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  roles?: string[];
  avatar?: any | null;
}
