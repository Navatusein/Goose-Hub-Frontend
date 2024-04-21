import {userApi} from "./api/user-api.ts";
import {IJwtPayload, UserRoles, IUser, ILoginData, IRegisterData} from "./model/types";
import userReducer from "./model/user-slice.ts";


export type {UserRoles, IUser, IJwtPayload, ILoginData, IRegisterData};
export {userReducer, userApi};