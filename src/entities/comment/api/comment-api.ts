import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithRefresh} from "@/shared/api/base-query.ts";
import {IComment} from "@/entities/comment"; 

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    fetchByContentId: builder.query<IComment[], string>({
      query: (id) => ({
        url: `/comment-api/v1/content/${id}`,
        method: "GET"
      }),
    }),
    fetchByUser: builder.query<IComment[], void>({
      query: () => ({
        url: `/comment-api/v1/user`,
        method: "GET"
      }),
    }),
    createByContentId: builder.mutation<IComment, {contentId: string, comment: IComment}>({
        query: ({contentId, comment}) => ({
          url: `/comment-api/v1/content/${contentId}`,
          method: "POST",
          body: comment
        }),
    }),
    createReplyById: builder.mutation<IComment, {commentId: string, comment: IComment}>({
      query: ({commentId, comment}) => ({
        url: `/comment-api/v1/reply/${commentId}`,
        method: "POST",
        body: comment
      }),
    }),
    delete: builder.mutation<void, string>({
      query: (id) => ({
        url: `/comment-api/v1/comment/${id}`,
        method: "DELETE"
      }),
    }),
  })
})