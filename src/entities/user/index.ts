import {userApi} from "./api/user-api.ts";
import {IJwtPayload, IUpdateUser, UserRoles, IUser, ILoginData, IRegisterData} from "./model/types";
import userReducer from "./model/user-slice.ts";


export type {UserRoles, IUser, IJwtPayload, IUpdateUser, ILoginData, IRegisterData};
export {userReducer, userApi};