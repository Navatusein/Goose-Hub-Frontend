import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {IUserProfile, IUserProfilePreview} from "@/entities/user-profile"; 

export const userProfileApi = createApi({
  reducerPath: "userProfileApi",
  baseQuery: baseQueryWithRefresh,
  tagTypes: ["userProfile"],
  endpoints: (builder) => ({
    fetch: builder.query<IUserProfile, string>({
      query: (userId) => ({
        url: `/user-profile-api/v1/profile/${userId}`,
        method: "GET"
      }),
      providesTags: () => ["userProfile"],
    }),
    fetchByIds: builder.query<IUserProfilePreview[], string[]>({
      query: (ids) => ({
        url: `/user-profile-api/v1/profile/ids`,
        method: "POST",
        body: ids
      })
    }),
    update: builder.mutation<IUserProfile, IUserProfile>({
      query: (userProfileDto) => ({
        url: `/user-profile-api/v1/profile`,
        method: "PUT",
        body: userProfileDto
      }),
      invalidatesTags: ["userProfile"]
    }),
  })
})