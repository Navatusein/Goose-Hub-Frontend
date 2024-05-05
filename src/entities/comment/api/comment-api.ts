import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {IComment} from "@/entities/comment"; 

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: baseQueryWithRefresh,
  tagTypes: ["comments"],
  endpoints: (builder) => ({
    fetchByContentId: builder.query<IComment[], string>({
      query: (id) => ({
        url: `/comment-api/v1/comments/content/${id}`,
        method: "GET"
      }),
      providesTags: () => ["comments"]
    }),
    fetchByUser: builder.query<IComment[], void>({
      query: () => ({
        url: `/comment-api/v1/comments/user`,
        method: "GET"
      }),
    }),
    create: builder.mutation<IComment, IComment>({
      query: (comment) => ({
        url: `/comment-api/v1/comments/content`,
        method: "POST",
        body: comment
      }),
      invalidatesTags: ["comments"]
    }),
  })
})