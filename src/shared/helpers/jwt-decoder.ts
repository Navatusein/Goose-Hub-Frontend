import {IJwtPayload, UserRoles} from "@/entities/user";
import {jwtDecode} from "jwt-decode";

interface IRawJwtPayload {
  exp: number,
  UserId: string,
  Role: UserRoles,
}

export const jwtDecoder = (jwtToken: string): IJwtPayload | undefined => {
  const decodedToken = jwtDecode<IRawJwtPayload>(jwtToken);

  const jwtPayload: IJwtPayload = {
    expiration: decodedToken.exp,
    role: decodedToken.Role,
    userId: decodedToken.UserId
  }

  if (Object.values(jwtPayload).some(x => x === undefined))
    return undefined;

  return jwtPayload;
};