import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {IComment} from "@/entities/comment"; 

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    delete: builder.query<void, string>({
      query: (id) => ({
        url: `/comment-api/v1/comment/${id}`,
        method: "DELETE"
      }),
    }),
    fetchContentById: builder.query<IComment, string>({
      query: (id) => ({
        url: `/comment-api/v1/content/${id}`,
        method: "GET"
      }),
    }),
    createContentById: builder.mutation<IComment, {id: string, comment: IComment}>({
        query: ({id, comment}) => ({
          url: `/comment-api/v1/content/${id}`,
          method: "POST",
          body: comment
        }),
    }),
    createReplyById: builder.query<IComment, {commentId: string, comment: IComment}>({
      query: ({commentId, comment}) => ({
        url: `/comment-api/v1/reply/${commentId}`,
        method: "POST",
        body: comment
      }),
    }),
    fetchUser: builder.query<IComment[], void>({
      query: () => ({
        url: `/comment-api/v1/user`,
        method: "GET"
      }),
    }),
  })
})