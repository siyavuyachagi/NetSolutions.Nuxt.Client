// //#region A
// export interface ApplicationUser {
//   id: string;
//   userName: string;
//   normalizedUserName?: string;
//   email: string;
//   normalizedEmail?: string;
//   emailConfirmed: boolean;
//   passwordHash?: string;
//   securityStamp?: string;
//   concurrencyStamp?: string;
//   phoneNumber?: string;
//   phoneNumberConfirmed: boolean;
//   twoFactorEnabled: boolean;
//   lockoutEnd?: Date | null;
//   lockoutEnabled: boolean;
//   accessFailedCount: number;

//   // Additional properties
//   firstName?: string;
//   lastName?: string;
//   profilePictureUrl?: string;
//   roles?: string[];
//   createdAt: Date;
//   updatedAt?: Date | null;
// }
// //#endregion

// //#region C
// export interface Client extends ApplicationUser {
//   clientOrganization: ClientOrganization;
//   projects: Project[];
// }

// export interface ClientOrganization {
//   id: string;
//   name: string;
//   clientId: string;
//   client: Client;
// }
// //#endregion

// //#region F
// export interface FileResource {
//   id: string;
//   name: string;
//   contentType: string;
//   extension: string;
//   size: number;
//   viewLink?: string | null;
//   downloadLink?: string | null;
//   provider: string;
//   createdAt: Date;
// }
// //#endregion

// //#region O
// export interface OurService {
//   id: string;
//   name: string;
//   description: string;
//   thumbnail: string;
//   createdAt: Date;
//   modifiedAt: Date;
// }
// //#endregion

// //#region P
// export interface Project {
//   id: string;
//   clientId: string;
//   client?: Client;
//   ourServiceId: string;
//   ourService?: OurService;
//   title: string;
//   description: string;
//   budget: number;
//   status: string;
//   createdAt: Date;
//   startDate?: Date | null;
//   endDate?: Date | null;
//   isDeleted: boolean;

//   // Related entities
//   projectFiles?: ProjectFile[];
//   projectTeamMembers?: Project_TeamMember[];
//   solutions?: Solution[];
//   projectTechnologyStacks?: Project_TechnologyStack[];
//   projectMilestones?: ProjectMilestone[];
//   projectTasks?: ProjectTask[];
// }

// export interface ProjectFile extends FileResource {
//   projectId: string;
//   project?: Project | null; // Optional navigation property
// }

// export interface Project_TeamMember {
//   id: string; // Guid mapped to string
//   projectId: string;
//   staffId: string;
//   createdAt: Date;
//   project_TeamMember_ProjectRoles: Project_TeamMember_ProjectRole[];
// }

// export interface Project_TechnologyStack {
//   id: string; // Guid mapped to string
//   projectId: string; // Guid mapped to string
//   project: Project;
//   technologyStackId: string; // Guid mapped to string
//   technologyStack: TechnologyStack;
// }
// export interface ProjectMilestone {
//   id: string; // Guid mapped to string
//   projectId: string; // Guid mapped to string
//   project: Project;
//   createdById: string;
//   createdBy: ApplicationUser;
//   title: string;
//   description?: string;
//   modifiedAt: Date;
//   createdAt: Date;
// }
// export interface ProjectTask {
//   id: string; // Guid mapped to string
//   projectId: string; // Guid mapped to string
//   project: Project;
//   title: string;
//   description?: string;
//   priority: string;
//   modifiedAt: Date;
//   createdAt: Date;
//   dueDate?: Date;
//   status: string;
// }
// export interface Project_TeamMember_ProjectRole {
//   id: string; // Guid mapped to string
//   projectTeamMemberId: string; // Guid mapped to string
//   projectTeamMember: Project_TeamMember;
//   projectRoleId: string; // Guid mapped to string
//   projectRole: ProjectRole;
// }

// export interface ProjectRole {
//   id: string; // Guid mapped to string
//   name: string;
// }
// //#endregion

// //#region S
// export interface Solution {
//   id: string; // Guid mapped to string
//   projectId?: string | null; // Nullable Guid
//   title: string;
//   description: string;
//   previewUrl?: string | null; // Optional field
//   createdAt: Date;
//   modifiedAt: Date;
//   solutionFiles: SolutionFile[];
//   technologyStack: any[]; //
// }

// export interface SolutionFile extends FileResource {
//   solutionId: string; // Guid mapped to string
//   solution: Solution;
// }

// //#endregion

// //#region T
// export interface TechnologyStack {
//   id: string; // Guid mapped to string
//   name: string;
//   description?: string;
//   nameAbbr?: string;
//   icon16x16?: string;
//   type: string; // Changed to string
//   projectTechnologyStacks: Project_TechnologyStack[];
// }
// //#endregion
