export type UserRoles = "User" | "Admin";

export interface IUser {
  jwtToken: string;
  userId: string;
}

export interface IJwtPayload {
  expiration: number;
  role: UserRoles;
  userId: string;
}
