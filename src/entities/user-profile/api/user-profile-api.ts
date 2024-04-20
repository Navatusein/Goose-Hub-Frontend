import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {IUserProfile, IUserProfilePreview} from "@/entities/user-profile"; 

export const userProfileApi = createApi({
  reducerPath: "userProfileApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    fetchByToken: builder.query<IUserProfile, void>({
      query: () => ({
        url: `/user-profile-api/v1/profile/`,
        method: "GET"
      })
    }),
    fetchById: builder.query<IUserProfilePreview, string>({
      query: (id) => ({
        url: `/user-profile-api/v1/profile/${id}`,
        method: "GET"
      })
    }),
    update: builder.query<IUserProfile, IUserProfile>({
      query: (userProfileDto) => ({
        url: `/user-profile-api/v1/profile`,
        method: "PUT",
        body: userProfileDto
      })
    }),
  })
})