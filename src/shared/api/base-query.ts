import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from "@reduxjs/toolkit/query";
import {RootState} from "@/app/store.ts";
import {IUser} from "@/entities/user";
import {setUser} from "@/entities/user/model/user-slice.ts";
import {createApi} from "@reduxjs/toolkit/query/react";


const API_URL = import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: "include",
  prepareHeaders: (headers, {getState}) => {
    const {user} = (getState() as RootState).user;

    if (user?.jwtToken)
      headers.set("Authorization", `Bearer ${user?.jwtToken}`)

    return headers
  }
})

const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta> = async (args, api, extraOptions)  => {
  let result = await baseQuery(args, api, extraOptions)
  let {user} = (api.getState() as RootState).user;

  if (result?.error?.status === 401 && user !== undefined) {
    const refreshResult = await baseQuery({
      url: "/authentication-api/v1/refresh",
      method: "POST",
      body: user
    }, api, extraOptions)

    if (refreshResult?.error) {
      console.log(refreshResult.error)
      return result;
    }

    user = (refreshResult.data) as IUser;

    api.dispatch(setUser(user!))

    result = await baseQuery(args, api, extraOptions)
  }

  return result;
}

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefresh,
  tagTypes: ["content", "info", "comments", "userProfile", "franchise"],
  endpoints: () => ({})
});

export {baseQueryWithRefresh, baseApi};