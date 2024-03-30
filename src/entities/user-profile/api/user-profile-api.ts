import {userProfileApi} from "@reduxjs/toolkit/query";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {IUserProfile, IUserProfilePreview, IHistory, INotification} from "@/entities/user-profile";

export const userProfileApi = createApi({
    reducerPath: "userProfileApi",
    baseQuery: baseQueryWithRefresh,
    endpoints: (builder) => ({
        fetchDirectedBy: builder.query<IUserProfile, string>({
            query: (id) => ({
                url: `/user-profile-api/v1/user-profile/${id}`,
                method: "GET"
            }),
        }),
        fetchDirectedBy: builder.query<IUserProfilePreview, string>({
            query: (id) => ({
                url: `/user-profile-api/v1/user-profile-preview/${id}`,
                method: "GET"
            }),
        }),
        fetchDirectedBy: builder.query<INotification, string>({
            query: (id) => ({
                url: `/user-profile-api/v1/notification/${id}`,
                method: "GET"
            }),
        }),
        fetchDirectedBy: builder.query<IHistory, string>({
            query: (id) => ({
                url: `/user-profile-api/v1/history/${id}`,
                method: "GET"
            }),
        }),
    })
})