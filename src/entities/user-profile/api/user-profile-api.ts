import {createApi} from "@reduxjs/toolkit/query";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {IUserProfile, IUserProfilePreview} from "@/entities/user-profile"; 

export const userProfileApi = createApi({
  reducerPath: "userProfileApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    fetchProfile: builder.query<IUserProfile, void>({
      query: () => ({
        url: `/user-profile-api/v1/profile/`,
        method: "GET"
      }),
    }),
    fetchProfileId: builder.query<IUserProfilePreview, string>({
      query: (id) => ({
        url: `/user-profile-api/v1/profile/${id}`,
        method: "GET"
      }),
    }),
    updateProfileId: builder.query<IUserProfile, IUserProfile>({
      query: (userProfileDto) => ({
        url: `/user-profile-api/v1/profile/${userProfileDto}`,
        method: "PUT"
      }),
    }),
  })
})