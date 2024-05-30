
import {baseApi} from "@/shared/api/base-query.ts";
import {IComment} from "@/entities/comment"; 

export const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchCommentByContentId: builder.query<IComment[], string>({
      query: (id) => ({
        url: `/comment-api/v1/comments/content/${id}`,
        method: "GET"
      }),
      providesTags: () => ["comments"]
    }),
    fetchCommentByUser: builder.query<IComment[], void>({
      query: () => ({
        url: `/comment-api/v1/comments/user`,
        method: "GET"
      }),
    }),
    createComment: builder.mutation<IComment, IComment>({
      query: (comment) => ({
        url: `/comment-api/v1/comments/content`,
        method: "POST",
        body: comment
      }),
      invalidatesTags: ["comments", "userPreview"]
    }),
  }),
  overrideExisting: false
})