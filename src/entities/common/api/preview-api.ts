import {baseApi} from "@/shared/api/base-query.ts";
import {IPreview, IQuery, IPagination} from "@/entities/common";

export const previewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchPreviewByFranchiseId: builder.query<IPreview, string>({
      query: (id) => ({
        url: `/movie-api/v1/content/preview/franchise/${id}`,
        method: "GET"
      }),
      providesTags: () => ["content"]
    }),

    fetchPreviewByFilter: builder.query<IPagination, IQuery>({
      query: (query) => ({
        url: `/movie-api/v1/content/preview/query`,
        method: "POST",
        body: query
      }),
      providesTags: () => ["content"]
    }),

    fetchPreviewByIds: builder.query<IPreview[], string[]>({
      query: (ids) => ({
        url: `/movie-api/v1/content/preview/ids`,
        method: "POST",
        body: ids
      }),
      providesTags: () => ["content"]
    }),

    fetchById: builder.query<IPreview, string>({
      query: (id) => ({
        url: `/movie-api/v1/content/${id}`,
        method: "POST"
      }),
      providesTags: () => ["content"]
    })
  }),
  overrideExisting: false
})