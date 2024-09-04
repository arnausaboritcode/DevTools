export enum UserRole {
  Admin,
  Anonymous,
}

export const userRolesValues: Record<UserRole, string> = {
  [UserRole.Admin]: 'Admin',
  [UserRole.Anonymous]: 'Anonymous',
};
