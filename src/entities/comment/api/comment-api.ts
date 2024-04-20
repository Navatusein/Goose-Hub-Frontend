import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {IComment} from "@/entities/comment"; 

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    delete: builder.query<void, string>({
      query: (id) => ({
        url: `/api/comment-api/v1/comment/${id}`,
        method: "DELETE"
      }),
    }),
    fetchContentById: builder.query<IComment, string>({
      query: (id) => ({
        url: `/api/comment-api/v1/content/${id}`,
        method: "GET"
      }),
    }),
    createContentById: builder.query<IComment, {id: string, comment: IComment}>({
        query: ({id, comment}) => ({
          url: `/api/comment-api/v1/content/${id}`,
          method: "POST",
          data: comment
        }),
    }),
    createReplyById: builder.query<IComment, {commentId: string, comment: IComment}>({
      query: ({commentId, comment}) => ({
        url: `/api/comment-api/v1/reply/${commentId}`,
        method: "POST",
        data: comment
      }),
    }),
    fetchUser: builder.query<IComment, void>({
      query: () => ({
        url: `/api/comment-api/v1/user`,
        method: "POST"
      }),
    }),
  })
})