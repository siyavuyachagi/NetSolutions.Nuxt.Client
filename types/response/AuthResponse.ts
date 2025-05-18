import type { ApplicationUser } from "./ApplicationUser";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  applicationUser: ApplicationUser;
}
