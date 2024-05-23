import {baseApi} from "@/shared/api/base-query.ts";
import {IUserProfile, IUserProfilePreview} from "@/entities/user-profile"; 

export const userProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserProfileById: builder.query<IUserProfile, string>({
      query: (userId) => ({
        url: `/user-profile-api/v1/profile/${userId}`,
        method: "GET"
      }),
      providesTags: () => ["userProfile"],
    }),
    fetchUserProfilePreviewsByIds: builder.query<IUserProfilePreview[], string[]>({
      query: (ids) => ({
        url: `/user-profile-api/v1/profile/ids`,
        method: "POST",
        body: ids
      }),
      providesTags: () => ["userPreview"],
    }),
    updateUserProfile: builder.mutation<IUserProfile, IUserProfile>({
      query: (userProfileDto) => ({
        url: `/user-profile-api/v1/profile`,
        method: "PUT",
        body: userProfileDto
      }),
      invalidatesTags: ["userProfile"]
    }),
    uploadAvatar: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: `/user-profile-api/v1/upload`,
        method: "POST",
        body: formData
      }),
      invalidatesTags: ["userProfile"]
    }),
    deleteAvatar: builder.mutation<void, void>({
      query: () => ({
        url: `/user-profile-api/v1/upload`,
        method: "DELETE"
      }),
      invalidatesTags: ["userProfile"]
    }),
  }),
  overrideExisting: false
})