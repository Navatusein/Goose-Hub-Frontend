export type UserRoles = "User" | "Admin";

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData {
  email: string;
  password: string;
  name: string;
}

export interface IUser {
  jwtToken: string;
  userId: string;
}

export interface IJwtPayload {
  expiration: number;
  role: UserRoles;
  userId: string;
}

export interface IUpdateUser {
  email: string;
  oldPassword: string;
  newPassword?: string;
}
