import type { ApplicationUser } from "./ApplicationUser";
import type { Solution } from "./Solution";

export interface SolutionLikeDto {
  id: string; // Guid in C# becomes string in TS
  solution: Solution;
  liker: ApplicationUser;
  timestamp: Date; // DateTime -> Date
}
